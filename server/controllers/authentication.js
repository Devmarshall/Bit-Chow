var User = require('../models/user');

module.exports.signUp = function (req, res) {
    var user = new User(req.body);
    user.save();

    User.find(user, function (err, results) {
        if (err) {
            console.log(err)
        }
        if (results && results.length === 1) {
            var UserData = results[0];

            res.json({
                email: UserData.email,
                userName: UserData.userName,
                _id: UserData._id
            })
        }
    })
}

module.exports.logIn = function (req, res) {
    User.find(req.body, function (err, results) {
        if (err) {
            console.log(err)
        }
        if (results && results.length === 1) {
            var UserData = results[0];

            res.json({
                email: UserData.email,
                userName: UserData.userName,
                _id: UserData._id
            })
        }
    })

}