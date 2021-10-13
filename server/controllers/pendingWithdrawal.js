const { PendingWithdrawal } = require("../models/PendingWithdrawal");

module.exports = {
    pendingWithdrawalCreate(req, res) {
        //save all the data we got from the client into the DB 
        const pendingWithdrawal = new PendingWithdrawal(req.body)

        pendingWithdrawal.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    pendingWithdrawalIndex(req,res,next) {
        PendingWithdrawal.find({ account: req.body.userID })
        .then(withdrawals => res.json(withdrawals))
        .catch(err => res.status(400).json('Error: ' + err));
    },
}
