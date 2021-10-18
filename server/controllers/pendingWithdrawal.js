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
    pendingWithdrawalList(req,res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        PendingWithdrawal.find()
        .then(withdrawals => {
            const sevenDaysUnix = new Date().setDate((new Date()).getDate() - 7);
            const oneDayUnix = new Date().setDate((new Date()).getDate() - 1);
            const pendingAllTimeCount = withdrawals.filter(w => w.status === 'Pending').length;
            const pendingSevenDaysCount = withdrawals.filter(w => w.status === 'Pending').filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const pendingOneDayCount = withdrawals.filter(w => w.status === 'Pending').filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            const confirmedAllTimeCount = withdrawals.filter(w => w.status === 'Confirmed').length;
            const confirmedSevenDaysCount = withdrawals.filter(w => w.status === 'Confirmed').filter(g => new Date(g.createdAt).valueOf() > sevenDaysUnix).length
            const confirmedOneDayCount = withdrawals.filter(w => w.status === 'Confirmed').filter(g => new Date(g.createdAt).valueOf() > oneDayUnix).length
            return res.json({ withdrawals, pendingAllTimeCount, pendingSevenDaysCount, pendingOneDayCount, confirmedAllTimeCount, confirmedSevenDaysCount, confirmedOneDayCount });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
}
