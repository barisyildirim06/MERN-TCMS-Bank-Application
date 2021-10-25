const { GeneralLedger } = require("../models/GeneralLedger");
let { User } = require('../models/User');

module.exports = {
    generalLedgerIndex(req,res,next) {
        GeneralLedger.find({ transactionNotes: req.body.userID })
         .then(products => res.json(products))
         .catch(err => res.status(400).json('Error: ' + err));
     },
     async generalLedgerCreate(req, res) {
        //save all the data we got from the client into the DB 
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        const account = await User.findOne({ userID: req.body.accountID })
        const general = {...req.body, transactionNotes: account._id }
        const generalLedger = new GeneralLedger(general)
        generalLedger.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true, message: 'Successfully created the Ledger' })
        })

    },
    generalLedgerList(req,res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        GeneralLedger.find()
        .then(generalLedgers => {
            var totalNzdAmount = 0;
            var totalAudAmount = 0;
            var totalUsdAmount = 0;
            generalLedgers.forEach(g => {
                if (g.currency === 'NZD') totalNzdAmount = totalNzdAmount + g.amount;
                if (g.currency === 'USD') totalUsdAmount = totalUsdAmount + g.amount;
                if (g.currency === 'AUD') totalAudAmount = totalAudAmount + g.amount;
            })
            return res.json({ totalNzdAmount, totalUsdAmount, totalAudAmount })
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
}
