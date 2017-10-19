var User = require('../models/user.js');

module.exports.getFollowableUsers = function (req, res) {
    var currentUserId = req.body._id;
    var followableUsers = new Array;

    User.find({}).sort({
        userName: -1
    }).exec(function (err, response) {

        var allUsers = response;

        if (err) {
            res.json(err)
        } else {
            for (var i = 0; i < allUsers.length; i++) {
                if (allUsers[i]._id == currentUserId) { } else {
                    followableUsers.push({
                        _id: allUsers[i]._id,
                        email: allUsers[i].email,
                        userName: allUsers[i].userName,
                        followers: allUsers[i].followers,
                        following: allUsers[i].following
                    });
                }
            }
            res.json(followableUsers);
        }
    })
}

module.exports.followUser = function (req, res) {
    var followerId = req.body.follower;
    var followingId = req.body.following;


    User.findById(followerId, function (err, follower) {

        if (err) {
            res.error(err);
        } else {
            follower.following.push({
                userId: followingId
            })
            follower.save();
        }
    });

    User.findById(followingId, function (err, following) {
        if (err) {
            res.error(err)
        } else {
            following.followers.push({
                userId: followerId
            })
            following.save();
        }
    });
}