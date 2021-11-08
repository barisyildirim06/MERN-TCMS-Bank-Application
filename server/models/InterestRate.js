const mongoose = require('mongoose');

const interestRate = mongoose.Schema({
    rate: {
        type: String,
        default: 0,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
}, { timestamps: true })

const InterestRate = mongoose.model('InterestRate', interestRate);

module.exports = { InterestRate }