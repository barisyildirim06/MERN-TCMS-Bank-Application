const mongoose = require('mongoose');

const interestRate = mongoose.Schema({
    currency: {
        type: String
    },
    rate: {
        type: String
    }
}, { timestamps: true })

const InterestRate = mongoose.model('InterestRate', interestRate);

module.exports = { InterestRate }