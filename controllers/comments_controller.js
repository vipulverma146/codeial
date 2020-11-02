const Comment=require('../models/comments');
const Post=require('../models/post');

// controller for adding comment to the post
module.exports.create = async function (req, res) {
    // finding post

    try{
        let post = await Post.findById(req.body.post)
    if (post) {
         let comment =await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id

        })
        // adding comment to post
         post.comment.push(comment);
        post.save();

        req.flash('success','Comment is added !!');

        res.redirect('back');
    };

    }catch(err){
        console.log("Error---->",err);
        return;
    }
}







// creating controller to delete comment and update the Post


module.exports.destroy= async function(req,res){

    try{
        let comment= await Comment.findById(req.params.id)
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
        let post= await Post.findByIdAndUpdate(postId,{
                $pull:{comment:req.params.id}
            });
               req.flash('success','Cooment is deleted !!');
                return res.redirect('back');
            
        }else{
            return res.redirect('back');

        }

    }catch(err){
        console.log("Error--->",err);

    }
}
    
