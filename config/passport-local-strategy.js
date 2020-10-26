const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {

    // find a user and stablish a connection

    User.findOne({ email: email }, function (err, user) {
        if (err) { console.log("Error in finding user during sign-in"); return done(err); }

        if (!user || user.password != password) {
            console.log("Username/Password is not correct");
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


module.exports=passport;