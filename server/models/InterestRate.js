const mongoose = require('mongoose');

const interestrate = mongoose.Schema({
    currency: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    }
}, { timestamps: true })

const InterestRate = mongoose.model('InterestRate', interestrate);

module.exports = { InterestRate }