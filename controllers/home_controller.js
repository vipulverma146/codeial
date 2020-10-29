const Post = require('../models/post');

module.exports.home = function (req, res) {

    Post.find({}, function (err, posts) {
        console.log(req.cookies);
        res.cookie('user_id', 25);
        return res.render('home', {
            title: "Home",
            posts:posts
        });

    });


}