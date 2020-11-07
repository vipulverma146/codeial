const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession= async function(req,res){

    try{

        let user= await User.findOne({email:req.body.email});

        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid Username/Password"
            });
        }

        return res.json(200,{
            message:"Sign-In Successfully using JWT",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})   // user.toJSON ---> convert user to json format which gets encrepted
            }
        });



    }catch(err){
        console.log("Error",err);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }

}