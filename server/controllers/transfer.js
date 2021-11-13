let { Transfer } = require('../models/Transfer');
let { User } = require('../models/User');

const transferCreate = async (req, res) => {
    const donorAccount = req.user;
    const recipientAccount = await User.findOne({ userID: req.body.accountID })
    if (!recipientAccount) return res.status(200).json({ success: false, message: 'Please provide a valid accountID' })
    if (donorAccount._id === recipientAccount._id || donorAccount.userID === recipientAccount.userID) {
        return res.status(200).json({ success: false, message: 'Users cannot transfer money to their own accounts' })
    }

    if (req.body.amount > donorAccount.availableBalance) return res.status(200).json({ success: false, message: 'Transfer amount cannot be larger than available balance' })
    const transferData = {
        ...req.body,
        recipientAccount: recipientAccount._id,
        recipientUserID: recipientAccount.userID,
        donorAccount: donorAccount._id,
        donorUserID: donorAccount.userID,
    }

    const transfer = new Transfer(transferData)
    await transfer.save((err) => {
        if (err) return res.status(200).json({ success: false, message: 'An error occured during transfer. Please try it later' })
    })
    await User.findByIdAndUpdate({ _id: recipientAccount._id }, { availableBalance: Number(recipientAccount.availableBalance) + Number(req.body.amount) })
    await User.findByIdAndUpdate({ _id: donorAccount._id }, { availableBalance: Number(donorAccount.availableBalance) - Number(req.body.amount) })
    return res.status(200).json({ success: true, message: 'The transfer done successfully' })
}

module.exports = {
    transferCreate
}
