let { User } = require('../models/User');

module.exports = {
    userUpdate(req,res,next){
        User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            user.lastname = req.body.lastname;
            user.phone = req.body.phone;
            user.email =req.body.email;
            user.image = req.body.image;
            user.companyName = req.body.companyName;
            user.irdNumber = req.body.irdNumber;
            user.companyOfficeNumber = req.body.companyOfficeNumber;
            user.agentFirstName = req.body.agentFirstName;
            user.agentLastName = req.body.agentLastName;
            user.agentJobTitle = req.body.agentJobTitle;
            user.nzdWithdrawalAccount = req.body.nzdWithdrawalAccount;
            user.usdWithdrawalAccount = req.body.usdWithdrawalAccount;
            user.audWithdrawalAccount = req.body.audWithdrawalAccount;
            user.idimage = req.body.idimage;

            user.save()
            .then(() => res.json('user updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
    listUsers(req, res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" });
        User.find()
        .then(users => {
            const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
            const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);
            const allTimeCount = users.length;
            const sevenDaysCount = users.filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const oneDayCount = users.filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            return res.json({ users, allTimeCount, sevenDaysCount, oneDayCount });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
    resetPassword(req, res) {
        const { email, currentPassword, newPassword, confirmPassword } = req.body;
        let errors = [];
        //Check required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            errors.push({ msg: "Please fill in all fields." });
        }
        
        //Check passwords match
        if (newPassword !== confirmPassword) {
            errors.push({ msg: "New passwords do not match." });
        }
        
        //Check password length
        if (newPassword.length < 6 || confirmPassword.length < 6) {
            errors.push({ msg: "Password should be at least six characters." });
        }
    
        if (errors.length > 0) {
            res.render("resetPassword", {
                errors,
                name: req.user.name,
            });
        } 
        else {
            User.findOne({ email: email }).then(user => {
                user.comparePassword(currentPassword, (err, isMatch) => {
                    if (!isMatch) return res.json({ loginSuccess: false, message: "Wrong password" });
                    else {
                        //VALIDATION PASSED
                        user.password = newPassword
                        user.save((err, doc) => {
                            if (err) return res.json({ success: false, err });
                            return res.status(200).json({
                                success: true
                            });
                        })
                    }
                });
            });
        }
    }
}