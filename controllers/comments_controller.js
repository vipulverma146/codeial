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
                post:req.body.post,
                user:req.user._id
                
            },function(err,comment){
                if(err){
                    console.log("Error in creating Comment--->",err);
                    return;
                }
                // adding comment to post
                post.comment.push(comment);
                post.save();

                res.redirect('back');
            });
        }


    });
}