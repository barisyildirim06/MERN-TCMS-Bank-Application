const mongoose = require('mongoose');

const interestRate = mongoose.Schema({
    currency: {
        type: String,
        required: true,
        unique: 1
    },
    rate: {
        type: String,
        default: 0,
        required: true
    }
}, { timestamps: true })

const InterestRate = mongoose.model('InterestRate', interestRate);

module.exports = { InterestRate }