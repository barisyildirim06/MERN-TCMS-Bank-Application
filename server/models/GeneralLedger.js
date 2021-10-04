const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalLedgerSchema = mongoose.Schema({
    transactionNotes: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionType: {
        type: String
    },
    transactionDate: {
        type: String
    },
    ledgerSource: {
        type: String
    },
    amount:{
        type: Number
    },
    currency:{
        type: String
    },
    nzdAmount:{
        type: Number
    },
}, { timestamps: true })

const GeneralLedger = mongoose.model('GeneralLedger', generalLedgerSchema);

module.exports = { GeneralLedger }