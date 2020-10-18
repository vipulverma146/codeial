const express=require('express');

const port=8000;

const app=express();
// Using express-ejs-layouts
const expressLayout=require('express-ejs-layouts');
// accesing db
const db=require('./config/mongoose')
// extract style and script from sub-pages into layout

app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
//using assets folder
app.use(express.static('./assets'));
app.use(expressLayout);
// use express router
app.use('/',require('./routes/index'));

// setup view engine

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`error in creating express server:${err}`);
    }

    console.log(`Server is running fine on port no.${port}`);
});