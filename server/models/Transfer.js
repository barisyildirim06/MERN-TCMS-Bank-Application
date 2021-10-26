const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = mongoose.Schema({
    recipientAccount: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    donorAccount: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientUserID: {
        type: Number,
        required: true
    },
    donorUserID: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        default: 'Transfer',
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    currency:{
        type: String,
        required: true
    },
}, { timestamps: true })

const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = { Transfer }