const Comment=require('../models/comments');
const Post=require('../models/post');
const commentMailer=require('../mailers/comment_mailer');
const queue=require('../config/kue');
const commentEmailWorkers=require('../workers/comments_email_worker');
const Like = require('../models/like');

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

        comment = await comment.populate('user','name email').execPopulate();   
         //commentMailer.newComment(comment); 

         let job=queue.create('emails',comment).save(function(err){
             if(err){
                 console.log("Error in creating Queue",err);
                 return;
             }
             console.log("Job Enqued",job.id);
         })

        // if (req.xhr){
           
        //     return res.status(200).json({
        //         data: {
        //             comment: comment
        //         },
        //         message: "Post created!"
        //     });
        // }

        req.flash('success','Comment is added !!');

        res.redirect('back');
    };

    }catch(err){
        console.log("Error----> yai wala",err);  
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
            // destroy the associated likes for this comment
            // await Like.deleteMany({likeable:comment._id,model:'Comment'});


               req.flash('success','Cooment is deleted !!');
                return res.redirect('back');
            
        }else{
            return res.redirect('back');

        }

    }catch(err){
        console.log("Error--->",err);

    }
}




    
