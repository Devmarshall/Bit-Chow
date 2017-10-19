var mongoose = require('mongoose');

module.exports = mongoose.model('Tweet', {
    userId: String,
    userEmail: String,
    userName: String,
    userImg: String,
    content: String,
    img: String,
    postDate: {
        type: Date,
        default: Date.now
    }
})