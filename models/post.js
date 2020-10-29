const mongoose =require('mongoose');


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // User schema is linked here to get the post user through ObjectId
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    }

},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;