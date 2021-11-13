const { PendingWithdrawal } = require("../models/PendingWithdrawal");
const { GeneralLedger } = require("../models/GeneralLedger");
const { User } = require("../models/User");

module.exports = {
    async pendingWithdrawalCreate(req, res) {
        //save all the data we got from the client into the DB 
        const pendingWithdrawal = new PendingWithdrawal(req.body)
        pendingWithdrawal.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })
        // const account = await User.findOne({ _id: req.body.account })
        // if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: req.body.account }, { availableBalanceNZD: Number(account.availableBalanceNZD) + Number(req.body.amount) })
        // if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: req.body.account }, { availableBalanceUSD: Number(account.availableBalanceUSD) + Number(req.body.amount) })
        // if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: req.body.account }, { availableBalanceAUD: Number(account.availableBalanceAUD) + Number(req.body.amount) })
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

            var totalNzdAmount = 0;
            var totalAudAmount = 0;
            var totalUsdAmount = 0;
            withdrawals.filter(w => w.status === 'Pending').forEach(w => {
                if (w.currency === 'NZD') totalNzdAmount = totalNzdAmount + w.amount;
                if (w.currency === 'USD') totalUsdAmount = totalUsdAmount + w.amount;
                if (w.currency === 'AUD') totalAudAmount = totalAudAmount + w.amount;
            })
            return res.json({ withdrawals, pendingWithdrawals: withdrawals.filter(w => w.status === 'Pending'), pendingAllTimeCount, pendingSevenDaysCount, pendingOneDayCount, confirmedAllTimeCount, confirmedSevenDaysCount, confirmedOneDayCount, totalNzdAmount, totalAudAmount, totalUsdAmount });
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
    async approveWithdrawal(req,res) {
        if (!req.user.isAdmin) return res.status(200).json({ success: false, message: "You don't have access" })
        const withdrawal = await PendingWithdrawal.findOne({ _id : req.body._id })
        if (withdrawal.status === 'Pending') {
            const update = await PendingWithdrawal.findOneAndUpdate({ _id: req.body._id }, { status: 'Confirmed' }, { new: true })
            if (update.status === 'Confirmed') {
                const ledger = {
                    transactionNotes: withdrawal.account,
                    transactionType: 'DEBIT',
                    transactionDate: new Date().toISOString().split('T')[0],
                    amount: withdrawal.amount * -1,
                    currency: withdrawal.currency
                }
                const generalLedger = new GeneralLedger(ledger)
                generalLedger.save((err) => {
                    if (err) return res.status(400).json({ success: false, message: 'An error occured when saving debit' ,err })
                    return res.status(200).json({ success: true, message: 'The withdrawal is approved successfully' })
                })
            }
        }
    }
}
