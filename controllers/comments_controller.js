const Comment=require('../models/comments');
const Post=require('../models/post');


module.exports.create=function(req,res){
    // finding post

    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log("Error in finding Post---->",err);
            return;
        }

        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },function(err,comment){
                // adding comment to post
                post.comments.push(comment);
                post.save();

                res.redirect('back');
            });
        }


    });
}