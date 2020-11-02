const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true   // allow us to set 1st arg.of function as a req
}, function (req,email, password, done) {

    // find a user and stablish a connection

    User.findOne({ email: email }, function (err, user) {
        if (err) { req.flash('Error In finding User',err); return done(err); }

        if (!user || user.password != password) {
            // console.log("Username/Password is not correct");
            req.flash('error','Username/Password is Invalid')
            return done(null, false);
        }

        return done(null, user);

    });


}));


// seralizing the user to decide which key is use to be in cookies


passport.serializeUser(function (user, done) {
   return done(null, user.id);

});

// Deserializing the user fro the key in the cookis


passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user ---> Passport");
            return done(err);
        }
        return done(null,user);
    })
});

// check if user is authenticated

passport.checkAuthentication=function(req,res,next){
    // if user is signed in then pass on the req to next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in

    return res.redirect('/users/sign-in');
}


// setup the views for the sign-in user


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){

        res.locals.user=req.user;

    }
    next();
}


module.exports=passport;