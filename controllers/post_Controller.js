const Post = require('../models/post');

const Comment = require('../models/comments');
const Like = require('../models/like');

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

module.exports.destroy =async function (req, res) {

    try{
        let post=await Post.findById(req.params.id); 
        //here authentication is done post.user check the user id from post model
        if (post.user == req.user.id) {    // .id means converting the object id into string
           
            // deleting the associated likes for the post and all it's comments likes too

            // await Like.deleteMany({likeable:post ,onModel:'Post'});
            // await Like.deleteMany({_id:{$in:post.Comment}});
           
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
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

            }
        
        else {

            req.flash('error',"You cannot Delete the post");
            return res.redirect('back');
        }
    }catch(err){
        console.log("****** Error",err);

        return res.json(500,{
            message:"Internal Server Error"
        });

    }

}

   