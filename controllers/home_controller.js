const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {

    try {
// finding all posts along with comments and users name
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'        
                }
                // ,
                // populate:{
                //     path:'likes'
                // }
            })
            // .populate('likes');

     // showing all registered user on home page
        let users = await User.find({})
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users: users
        });




    } catch (error) {

        console.log("Error--->", error);

    }

}


