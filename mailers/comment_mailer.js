const nodemailer=require('../config/nodemailer');

exports.newComment=(Comment)=>{
    console.log("Inside Comment Mailer");

    let htmlString= nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    
    nodemailer.transporter.sendMail({

        from:"vermavipul438@gmail.com",
        to: Comment.user.email, 
        subject:"New Comment Published",
        html:htmlString

    },(err,info)=>{
        if(err){
            console.log("Error while Sending mail",err);
            return;
        }
        console.log("Your message is sent",info);
        return;
    });
    
}