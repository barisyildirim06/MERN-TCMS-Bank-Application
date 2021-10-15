const { GeneralLedger } = require("../models/GeneralLedger");

module.exports = {
    generalLedgerIndex(req,res,next) {
        GeneralLedger.find({ transactionNotes: req.body.userID })
         .then(products => res.json(products))
         .catch(err => res.status(400).json('Error: ' + err));
     },
}
