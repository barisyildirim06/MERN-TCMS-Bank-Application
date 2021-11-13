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
    amount:{
        type: Number
    },
    currency:{
        type: String
    },
}, { timestamps: true })

const GeneralLedger = mongoose.model('GeneralLedger', generalLedgerSchema);

module.exports = { GeneralLedger }