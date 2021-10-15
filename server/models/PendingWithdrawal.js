const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pendingWithdrawal = mongoose.Schema({
    account: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount:{
        type: Number
    },
    dateSubmitted: {
        type: String
    },
    status: {
        type: String
    },
    currency:{
        type: String
    },
    dateConfirmed: {
        type: String
    }
}, { timestamps: true })

const PendingWithdrawal = mongoose.model('PendingWithdrawal', pendingWithdrawal);

module.exports = { PendingWithdrawal }