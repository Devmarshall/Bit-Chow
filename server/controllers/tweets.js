var Tweet = require('../datasets/tweet.js')

module.exports.postTweet = function (req, res) {
    var tweet = new Tweet(req.body);

    tweet.save(function (err, tweet) {
        if (err) {
            console.log(err)
        } else {
            Tweet.find({}).sort({
                postDate: -1
            }).exec(function (err, allTweets) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(allTweets);
                }
            })
        }
    })
}

module.exports.getTweets = function (req, res) {
    Tweet.find({}).sort({
        postDate: -1
    }).exec(function (err, allTweets) {
        if (err) {
            res.json(err)
        } else {
            res.json(allTweets)
        }
    })
}

module.exports.getmyTweets = function (req, res) {

}