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


// creating controller to delete comment and update the Post


module.exports.destroy=function(req,res){

    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{
                $pull:{comment:req.params.id}
            },function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');

        }
    });
}