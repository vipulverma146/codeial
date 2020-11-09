const nodemailer=require('nodemailer');

const ejs=require('ejs');

const path=require('path');

let transporter =nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,

    auth:{
        user:"vipul97219528@gmail.com",
        pass:"vipulverma"

    }
}); 


let renderTemplate =(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile
    {
        path.join(__dirname ,'../models/mailers',relativePath ),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering Template",err);
                return;
            }
            mailHTML=template;
        }
    }
    return mailHTML;
}


module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}