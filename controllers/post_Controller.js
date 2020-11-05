const Post = require('../models/post');

const Comment = require('../models/comments');

module.exports.create = function (req, res) {

    Post.create({
        content: req.body.content,
        user: req.user._id


    }, function (err, post) {
        if (err) {
            console.log("Error in creating post----->", err);
            return;

        }
// check if req is Ajax
        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post:post
        //         },
        //         message:'Post created !'
        //     });
        //     
        // }


        req.flash('success','Post is Successfully created');
        return res.redirect('back');
    })
}


// creating controller for deleting Post along with comments

module.exports.destroy = function (req, res) {

    Post.findById(req.params.id, function (err, post) {
        //here authentication is done post.user check the user id from post model
        if (post.user == req.user.id) {    // .id means converting the object id into string
            post.remove();

            Comment.deleteMany({ post: req.params.id }, function (err) {
                 // check if req is Ajax
                 if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id:req.param.id
                        },
                        message:'Post deleted !'
                    });
                }
        

                
                req.flash('error','Post along with associated comments deleted!!');
                return res.redirect('back');

            });
        }
        else {

            return res.redirect('back')
        }
    });
}