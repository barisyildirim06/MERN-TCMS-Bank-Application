let { Transfer } = require('../models/Transfer');
let { User } = require('../models/User');

const transferCreate = async (req, res) => {
    const donorAccount = req.user;
    const recipientAccount = await User.findOne({ userID: req.body.accountID })
    if (!recipientAccount) return res.status(200).json({ success: false, message: 'Please provide a valid accountID' })
    if (donorAccount._id === recipientAccount._id || donorAccount.userID === recipientAccount.userID) {
        return res.status(200).json({ success: false, message: 'Users cannot transfer money to their own accounts' })
    }
    if (req.body.amount > donorAccount.availableBalanceNZD && req.body.currency === 'NZD' ) return res.status(200).json({ success: false, message: 'Transfer amount cannot be larger than available balance' })
    if (req.body.amount > donorAccount.availableBalanceUSD && req.body.currency === 'USD' ) return res.status(200).json({ success: false, message: 'Transfer amount cannot be larger than available balance' })
    if (req.body.amount > donorAccount.availableBalanceAUD && req.body.currency === 'AUD' ) return res.status(200).json({ success: false, message: 'Transfer amount cannot be larger than available balance' })
    const transferData = {
        ...req.body,
        recipientAccount: recipientAccount._id,
        recipientUserID: recipientAccount.userID,
        donorAccount: donorAccount._id,
        donorUserID: donorAccount.userID,
        transactionDate: new Date().toISOString().split('T')[0]
    }

    const transfer = new Transfer(transferData)
    await transfer.save((err) => {
        if (err) return res.status(200).json({ success: false, message: 'An error occured during transfer. Please try it later' })
    })
    // update recipient accounts
    if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: recipientAccount._id }, { availableBalanceNZD: Number(recipientAccount.availableBalanceNZD) + Number(req.body.amount) })
    if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: recipientAccount._id }, { availableBalanceUSD: Number(recipientAccount.availableBalanceUSD) + Number(req.body.amount) })
    if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: recipientAccount._id }, { availableBalanceAUD: Number(recipientAccount.availableBalanceAUD) + Number(req.body.amount) })

    // Update donor accounts
    if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: donorAccount._id }, { availableBalanceNZD: Number(donorAccount.availableBalanceNZD) - Number(req.body.amount) })
    if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: donorAccount._id }, { availableBalanceUSD: Number(donorAccount.availableBalanceUSD) - Number(req.body.amount) })
    if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: donorAccount._id }, { availableBalanceAUD: Number(donorAccount.availableBalanceAUD) - Number(req.body.amount) })

    return res.status(200).json({ success: true, message: 'The transfer done successfully' })
}

module.exports = {
    transferCreate
}
