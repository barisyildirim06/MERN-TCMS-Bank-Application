const mongoose = require('mongoose');

const interestRate = mongoose.Schema({
    rate: {
        type: Number,
        default: 0,
        required: true
    },
    currency: {
        type: String,
        required: true,
        unique: 1
    },
    confirmAmount: {
        type: Number
    }
}, { timestamps: true })

const InterestRate = mongoose.model('InterestRate', interestRate);

module.exports = { InterestRate }