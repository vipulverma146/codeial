const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt; // Importing module which helps us extracting jwt from header

const User=require('../models/user');


let opts={
    jwtFromRequest :ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use( new JWTStrategy(opts,function(jwt_payload,done){

    User.findById(jwt_payload._id,function(err,user){
        if(err){
            console.log("Eroor in finding User using JWT--->");
            return done(err,null);
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });

}));


module.exports=passport;

