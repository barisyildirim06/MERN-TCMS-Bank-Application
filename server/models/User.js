const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    userID: {
        type:Number,
        unique: 1,
        default: Math.floor(100000000 + Math.random() * 900000000)
    },
    name: {
        type:String,
        maxlength:50
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    phone: {
        type: Number
    },
    isAdmin: {
        type: Number,
        default: 0
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    verified : {
        type:Number,
        default: 0 
    },
    image: {
        type: String
    },
    idimage: {
        type: String
    },
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    companyName: {
        type: String,
        maxlength: 100
    },
    irdNumber: {
        type: Number
    },
    companyOfficeNumber: {
        type: Number
    },
    agentFirstName: {
        type: String
    },
    agentLastName: {
        type: String
    },
    agentJobTitle: {
        type: String
    },
    nzdWithdrawalAccount: {
        type: String
    },
    usdWithdrawalAccount: {
        type: String
    },
    audWithdrawalAccount: {
        type: String
    },
}, { timestamps: true })


userSchema.pre('save', function( next ) {
    var user = this;
    
    if(user.isModified('password')){    
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash 
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }