const Like=require('../models/like');
const Post =require('../models/post');
const Comment=require('../models/comments');



module.exports.toggleLike= async function(req,res){
    try{

        let likeable;
        let deleted=false;

        // finding likeables i.e. where likes is applied i.e. Post/Comment

        if(req.query.type=='Post'){
            likeable= await Post.findById(req.query.id).populate('likes');

        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // checking if like is already exist

        let existingLike= await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.query._id

        });


        // if likes already exits then delete it

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted=true;
        }else{
            // creating new like

            let newLike= await Like.create({
                user:req.user._id,
                likeable:req.user.id,
                onModel:req.user.type
            });

            likeable.likes.push(newLike._id);

            likeable.save();
        }

        // return res.json(200,{
        //     message:"Request Successful !",
        //     data: {
        //         deleted:deleted

        //     }
        // });


    }catch(err){
        console.log('Error in liking/disliking Post/Comment',err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
}