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

            user.save()
            .then(() => res.json('user updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    }
}