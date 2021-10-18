const { GeneralLedger } = require("../models/GeneralLedger");

module.exports = {
    generalLedgerIndex(req,res,next) {
        GeneralLedger.find({ transactionNotes: req.body.userID })
         .then(products => res.json(products))
         .catch(err => res.status(400).json('Error: ' + err));
     },
     generalLedgerCreate(req, res) {
        //save all the data we got from the client into the DB 
        const generalLedger = new GeneralLedger(req.body)
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        GeneralLedger.find()
        generalLedger.save((err) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ success: true })
        })

    },
    generalLedgerList(req,res) {
        if (!req.user.isAdmin) return res.status(400).json({ success: false, message: "You don't have access" })
        GeneralLedger.find()
        .then(generalLedgers => {
            const sevenDays = customDate.setDate(customDate.getDate() - 3);
            const allTimeCount = generalLedgers.length;
            const sevenDaysCount = generalLedgers.filter(g => g.createdAt < sevenDays).length
            return res.json({generalLedgers, allTimeCount, sevenDaysCount })
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },
}
