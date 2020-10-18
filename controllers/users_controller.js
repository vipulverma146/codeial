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

