const Post = require('../models/post');
const User=require('../models/user');

module.exports.home = function (req, res) {

    // Post.find({}, function (err, posts) {
    //     console.log(req.cookies);
    //     res.cookie('user_id', 25);
        

  

    Post.find({})
    .populate('user')
    .populate({
        path:'comment',
        populate:{
            path:'user'
        }
    })

    .exec(function(err,posts){
        User.find({},function(err,users){
            return res.render('home', {
                title: "Home",
                posts: posts,
                all_users: users
            });

        });
       
    });
}