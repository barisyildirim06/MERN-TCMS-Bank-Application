let { User } = require('../models/User');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'client/public/static/img/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")


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
            const allTimeCountVerified = users.filter(u => u.verified === 1).length;
            const sevenDaysCountVerified = users.filter(u => u.verified === 1).filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const oneDayCountVerified = users.filter(u => u.verified === 1).filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            const allTimeCountUnapproved = users.filter(u => u.verified === 0).length;
            const sevenDaysCountUnApproved = users.filter(u => u.verified === 0).filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const oneDayCountUnapproved = users.filter(u => u.verified === 0).filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            return res.json({ users, allTimeCount, sevenDaysCount, oneDayCount, allTimeCountVerified, sevenDaysCountVerified, oneDayCountVerified, allTimeCountUnapproved, sevenDaysCountUnApproved, oneDayCountUnapproved });
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
    },
    verifyUser(req,res) {
        if (!req.user.isAdmin) return res.status(200).json({ success: false, message: "You don't have access" })
        User.findOneAndUpdate({ _id: req.body._id }, { verified: 1 }, () => {
            return res.status(200).json({ success: true, message: "User successfully verified" })
        })
    },
    loginUser (req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!user)
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, email not found"
                });
    
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "Wrong password" });
    
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res.cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, isAdmin: user.isAdmin? true : false
                    });
                });
            });
        });
    },
    registerUser (req, res) {

        const user = new User(req.body);
    
        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    },
    authUser (req, res) {
        res.status(200).json({
            _id: req.user._id,
            isAuth: true,
            isAdmin: req.user.isAdmin? true : false,
            email: req.user.email,
            phone: req.user.phone,
            companyName: req.user.companyName,
            irdNumber: req.user.irdNumber,
            companyOfficeNumber: req.user.companyOfficeNumber,
            name: req.user.name,
            lastname: req.user.lastname,
            verified: req.user.verified,
            image: req.user.image,
            agentFirstName: req.user.agentFirstName,
            agentLastName: req.user.agentLastName,
            agentJobTitle: req.user.agentJobTitle,
            nzdWithdrawalAccount: req.user.nzdWithdrawalAccount,
            usdWithdrawalAccount: req.user.usdWithdrawalAccount,
            audWithdrawalAccount: req.user.audWithdrawalAccount,
            idimage: req.user.idimage,
            userID: req.user.userID,
        });
    },
    uploadImage (req, res) {

        upload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
        })
    
    },
    logoutUser (req, res) {
        User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
    }
}