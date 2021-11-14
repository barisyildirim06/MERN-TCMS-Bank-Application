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
        const account = await User.findOne({ userID: Number(req.body.accountID) })
        if (!account) return res.status(200).json({ success: false, message: 'Please provide a valid accountID' })
        const general = {...req.body, transactionNotes: account._id, transactionDate: new Date().toISOString().split('T')[0] }
        const generalLedger = new GeneralLedger(general)
        await generalLedger.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
        })
        if (req.body.transactionType === 'CREDIT' || req.body.transactionType === 'ACCRUED INTEREST') {
            if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceNZD: Number(account.availableBalanceNZD) + Number(req.body.amount) })
            if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceUSD: Number(account.availableBalanceUSD) + Number(req.body.amount) })
            if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceAUD: Number(account.availableBalanceAUD) + Number(req.body.amount) })
        } else if (req.body.transactionType === 'FEES' || req.body.transactionType === 'DEBIT') {
            if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceNZD: Number(account.availableBalanceNZD) - Number(req.body.amount) })
            if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceUSD: Number(account.availableBalanceUSD) - Number(req.body.amount) })
            if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceAUD: Number(account.availableBalanceAUD) - Number(req.body.amount) })
        }
        return res.status(200).json({ success: true, message: 'Successfully created the Ledger' })
    },
     async generalLedgerImport(req, res) {
        //save all the data we got from the client into the DB 
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        let data = req.body.data;
        let buff = new Buffer.from(data, 'base64');
        let allText = buff.toString('ascii');
        const arr = allText.split('\n'); 
        var ledgers = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var newData = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < newData.length; j++) {
                obj[headers[j].trim()] = newData[j].trim();
            }
            ledgers.push(obj);
        }
        await Promise.all(ledgers.map(async ledger => {
            if (ledger.accountID) {
                const account = await User.findOne({ userID: Number(ledger.accountID) })
                if (account) {
                    const general = {...ledger, transactionNotes: account._id, transactionDate: new Date().toISOString().split('T')[0] }
                    const generalLedger = await new GeneralLedger(general)
                    await generalLedger.save()
                    if (ledger.transactionType === 'CREDIT' || ledger.transactionType === 'ACCRUED INTEREST') {
                        if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceNZD: Number(account.availableBalanceNZD) + Number(ledger.amount) })
                        if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceUSD: Number(account.availableBalanceUSD) + Number(ledger.amount) })
                        if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceAUD: Number(account.availableBalanceAUD) + Number(ledger.amount) })
                    } else if (ledger.transactionType === 'FEES' || ledger.transactionType === 'DEBIT') {
                        if (req.body.currency === 'NZD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceNZD: Number(account.availableBalanceNZD) - Number(ledger.amount) })
                        if (req.body.currency === 'USD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceUSD: Number(account.availableBalanceUSD) - Number(ledger.amount) })
                        if (req.body.currency === 'AUD') await User.findByIdAndUpdate({ _id: account._id }, { availableBalanceAUD: Number(account.availableBalanceAUD) - Number(ledger.amount) })
                    }
                }
            }
        }))
        return res.status(200).json({ success: true, message: 'Successfully created the Ledger' })
    },
    generalLedgerList(req,res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        GeneralLedger.find()
        .then(generalLedgers => {
            var totalNzdAmount = 0;
            var totalAudAmount = 0;
            var totalUsdAmount = 0;
            generalLedgers.forEach(g => {
                if (g.transactionType === 'CREDIT' || g.transactionType === 'ACCRUED INTEREST') {
                    if (g.currency === 'NZD') totalNzdAmount += g.amount;
                    if (g.currency === 'USD') totalUsdAmount += g.amount;
                    if (g.currency === 'AUD') totalAudAmount += + g.amount;
                }
                else if (g.transactionType === 'FEES' || g.transactionType === 'DEBIT' ) {
                    if (g.currency === 'NZD') totalNzdAmount -= g.amount;
                    if (g.currency === 'USD') totalUsdAmount -= g.amount;
                    if (g.currency === 'AUD') totalAudAmount -= g.amount;
                }
            })
            return res.json({ totalNzdAmount, totalUsdAmount, totalAudAmount })
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
}
