const User=require('../models/user');

module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log("error",err); return}
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                });
            }
            return res.redirect('/users/sign-in');
        })
    }
    else{
        return res.redirect('/users/sign-in');

    }
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
    // find the user
    User.findOne({email:req.body.email},function(err,user){
        // if user found
        if(user){
            // match the password with db password
            if(req.body.password != user.password){
                return res.redirect('back');
            }
            // handle session cookies
            res.cookie('user_id',user.id);
            return res.redirect('profile');
        }

        else{
            // if user not found

            return res.redirect('back');

        }
    })
}