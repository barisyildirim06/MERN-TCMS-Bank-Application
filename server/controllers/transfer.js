let { Transfer } = require('../models/Transfer');
let { User } = require('../models/User');
let { GeneralLedger } = require('../models/GeneralLedger');
let { PendingWithdrawal } = require('../models/PendingWithdrawal');

const transferCreate = async (req, res) => {
    const donorAccount = req.user;
        const recipientAccount = await User.findOne({ userID: req.body.accountID })
        if (!recipientAccount) return res.status(200).json({ success: false, message: 'Please provide a valid accountID' })
        if (donorAccount._id === recipientAccount._id || donorAccount.userID === recipientAccount.userID) {
            return res.status(200).json({ success: false, message: 'Users cannot transfer money to their own accounts' })
        }

        const general = await GeneralLedger.find({ transactionNotes: req.user._id });
        const withdrawal = await PendingWithdrawal.find({ account: req.user._id });
        const recipient = await Transfer.find({ recipientAccount: req.user._id });
        const donor = await Transfer.find({ donorAccount: req.user._id });
    
        let account = {
            principal: general?.filter(el => el.transactionType === 'CREDIT' && el.currency === req.body.currency )?.length? general?.filter(el => el.transactionType === 'CREDIT' && el.currency === req.body.currency )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
            interestAcrrued: general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === req.body.currency )?.length ? general?.filter(el => el.transactionType === 'ACRUED INTEREST' && el.currency === req.body.currency ).reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
            fees: general?.filter(el => el.transactionType === 'FEES' && el.currency === req.body.currency )?.length? general?.filter(el => el.transactionType === 'FEES' && el.currency === req.body.currency )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
            withdrawls: general?.filter(el => el.transactionType === 'DEBIT' && el.currency === req.body.currency )?.length? general?.filter(el => el.transactionType === 'DEBIT' && el.currency === req.body.currency )?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount * -1 : 0,
            pendingWithdrawls: withdrawal?.filter(el => el.status === 'Pending' && el.currency === req.body.currency)?.length? withdrawal?.filter(el => el.status === 'Pending' && el.currency === req.body.currency)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
            recipientTransfers: recipient?.filter(el => el.currency === req.body.currency)?.length? recipient?.filter(el => el.currency === req.body.currency)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount : 0,
            donorTransfers: donor?.filter(el => el.currency === req.body.currency)?.length? donor?.filter(el => el.currency === req.body.currency)?.reduce((a, b) => ({amount: a?.amount + b?.amount}))?.amount  * -1 : 0,
        }
        const availableBalance = account.principal + account.interestAcrrued + account.fees + account.withdrawls + account.pendingWithdrawls + account.recipientTransfers + account.donorTransfers
        if (req.body.amount > availableBalance) return res.status(200).json({ success: false, message: 'Transfer amount cannot be larger than available balance' })
        const transferData = {
            ...req.body,
            recipientAccount: recipientAccount._id,
            recipientUserID: recipientAccount.userID,
            donorAccount: donorAccount._id,
            donorUserID: donorAccount.userID,
        }

        const transfer = new Transfer(transferData)
        transfer.save((err) => {
            if (err) return res.status(200).json({ success: false, message: 'An error occured during transfer. Please try it later' })
            return res.status(200).json({ success: true, message: 'The transfer done successfully' })
        })
}

module.exports = {
    transferCreate
}
