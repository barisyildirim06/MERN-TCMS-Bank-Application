let { Transfer } = require('../models/Transfer');
let { User } = require('../models/User');
let { GeneralLedger } = require('../models/GeneralLedger');

module.exports = {
    async transferCreate(req, res) {
        //save all the data we got from the client into the DB 
        const donor = req.user;
        const recipient = await User.findOne({ userID: req.body.accountID })
        if (!recipient) return res.status(200).json({ success: false, message: 'Please provide a valid accountID' })
        if (donor._id === recipient._id || donor.userID === recipient.userID) {
            console.log(donor._id)
            console.log(recipient._id)
            return res.status(200).json({ success: false, message: 'Users cannot transfer money to their own accounts' })
        }

        const ledger = await GeneralLedger.find({ transactionNotes : donor._id })
        // const transferData = {
        //     ...req.body,
        //     recipientAccount: recipient._id,
        //     recipientUserID: recipient.userID,
        //     donorAccount: donor._id,
        //     donorUserID: donor.userID,
        // }
        // const transfer = new Transfer(transferData)
        // transfer.save((err) => {
        //     if (err) return res.status(200).json({ success: false, message: 'An error occured during transfer. Please try it later' })
        //     return res.status(200).json({ success: true, message: 'The transfer done successfully' })
        // })
    },
}
