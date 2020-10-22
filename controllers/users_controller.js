const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"Profile"
    });
}

// User Sign-In Page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"SignIn Page"
    });
};

// User Sign-Up Page

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"SignUp Page"
    });
};

// Get the sign-up data

module.exports.create=function(req,res){
    // check password and confirm_password are same
     if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // check weather user already exits or not i.e. by email

    User.findOne({email:req.body.email},function(err,user){
        if(err) {console.log("Getting error in finding user"); return}

        // if user is not present
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in creating user during sign-up"); return}

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('/users/sign-in');

        }
    })


}


// Sign-In and create session

module.exports.createSession=function(req,res){
    // Todo Later
}