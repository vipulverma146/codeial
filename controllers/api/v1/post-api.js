const Post=require('../../../models/post');
const Comment=require('../../../models/comments');

module.exports.index= async function(req,res){
    try{

        // finding all posts along with comments and users name
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comment',
        populate: {
            path: 'user'        
        }
    })

    return res.json(200,{
        message:"List of Posts",
        posts:posts
    });
}

    catch(err){

      console.log("****** Error",err);

      return res.json(500,{
          message:"Internal Server Error"
      });

    }
}


// Deleting posts through Api's

module.exports.destroy =async function (req, res) {

    try{
        let post=await Post.findById(req.params.id); 
        //here authentication is done post.user check the user id from post model
        //if (post.user == req.user.id) {    // .id means converting the object id into string
            post.remove();

            await Comment.deleteMany({ post: req.params.id });
        
                return res.json(200,{
                    message:"Post and Comments Deleted"
                });
    }catch(err){
        console.log("****** Error",err);

        return res.json(500,{
            message:"Internal Server Error"
        });

    }

}


