const express=require('express');

const port=8000;
// use express router
const app=express();

app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log(`error in creating express server:${err}`);
    }

    console.log(`Server is running fine on port no.${port}`);
});