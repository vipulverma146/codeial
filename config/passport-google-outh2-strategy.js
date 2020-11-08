const passport= require('passport');

const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');

const User=require('../models/user');


// now telling passport to use new Strategy google login

passport.use(new googleStrategy({
    clientID:"274834192889-frv8gsv5vhe3gnggnqp1o4q84jcvqjpr.apps.googleusercontent.com",
    clientSecret:"irUguydybvjr8P6NaJcpXsJz",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},function(accessToken,refreshToken,profile,done){
// find the user in db
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google-strategy-passport",err);
            return;
        }
        console.log(accessToken,refreshToken);
        console.log(profile);
        if(user){
            //if found set this user as req.user
            return done(null,user);
        }
        else{
            // if not found than create a user and set it to req.user
            User.create({
                name:profile.displayName,
                password:crypto.randomBytes(20).toString('hex'),
                email:profile.emails[0].value
            },function(err,user){
                if(err){
                    console.log("Error in creating User using google-strategy-passport",err);
                    return;
                }
               return done(null,user);
            });
        }
    });


}));


module.exports=passport;