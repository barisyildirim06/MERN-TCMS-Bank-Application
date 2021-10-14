const mongoose = require('mongoose');

const subscriber = mongoose.Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Subscriber = mongoose.model('Subscriber', subscriber);

module.exports = { Subscriber }