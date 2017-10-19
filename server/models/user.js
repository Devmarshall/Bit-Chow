var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    userName: String,
    bio: String,
    password: String,
    profileImg: String,
    following: [{
        userId: String
    }],
    followers: [{
        userId: String
    }],
    signUpDate: {
        type: Date,
        default: Date.now
    }
})