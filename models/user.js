const mongoose=require('mongoose');
// setting up multer for file/photo uploads

const multer=require('multer');
const path=require('path');

const AVATAR_PATH=path.join('/uploads/users/avatar'); // path where file is stored

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,

    },
    password:{
        type:String,
        required:true
    },
        // timestamps:true
    });

    // path where file is gets stored

    let storage=multer.diskStorage({

        destination:function(req,file,cb){
            cb(null,path.join(__dirname,'..',AVATAR_PATH));
        },


        filename:function(req,file,cb){
            cb(null,file.fieldname+'_'+Date.now());
        }

    });


    userSchema.statics.avatarPath=multer({storage:storage}).single('avatar');

    userSchema.statics.avatarPath=AVATAR_PATH;
        
     const User=mongoose.model('User',userSchema);

    module.exports=User;