const express=require('express');
const cookieParser=require('cookie-parser');
const flash=require('connect-flash');   // use for showing flash messages

const port=8000;
const cors = require('cors');


const app=express();
// Using express-ejs-layouts
const expressLayout=require('express-ejs-layouts');

// accesing db
const db=require('./config/mongoose');
// file upload path
app.use('/uploads',express.static(__dirname+'/uploads'));
// express-session used to convert user.id into session cookies
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT =require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-outh2-strategy');
const nodemailer=require('./config/nodemailer');
app.use(cors());




//setup the chat server to be used with Socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/Chat_sockets.js').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is lisning on port 5000');


// used mongo-store
const MongoStore=require('connect-mongo')(session);
// sass middleware is used
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:false,
    outputStyle:'extended',
    prefix:'/css'
}));

// middleware for Post sign-up and sign-in form
app.use(express.urlencoded());

app.use(cookieParser());
// extract style and script from sub-pages into layout
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
//using assets folder
app.use(express.static('./assets'));
app.use(expressLayout);


// setup view engine

app.set('view engine','ejs');
app.set('views','./views');
// mongo store use to store the session cookie in db
app.use(session({
    name:'social-app',
    secret:'blahsometing',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autRemove:'disabled'
    },
    function(err){
        console.log(err || "Coonected to mongodb");
    })
}));
// passport is used
app.use(passport.initialize());
app.use(passport.session());
const customMiddleware=require('./config/middleware');


app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);


// use express router
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log(`error in creating express server:${err}`);
    }

    console.log(`Server is running fine on port no.${port}`);
});