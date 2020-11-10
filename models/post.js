const mongoose =require('mongoose');


const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // User schema is linked here to get the post user through ObjectId
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    // need to load all the comments of post while loading so include array of cooment id's
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }],

},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);

module.exports=Post;