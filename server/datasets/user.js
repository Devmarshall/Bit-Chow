var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    userName: String,
    password: String,
    following: [{
        email: String,
        userName: String,
        id: String
    }],
    followers: [{
        email: String,
        userName: String,
        id: String
    }],
    profileImg: String
})