const express=require('express');

const port=8000;

const app=express();
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