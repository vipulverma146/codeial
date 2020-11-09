const queue=require('../config/kue');

const commentMailer=require('../mailers/comment_mailer')  // for Sending emails

queue.process('emails', function(job,done){
    console.log("Email worker is processing a job",job.data);   // here job is like comment content
    commentMailer.newComment(job.data);

    done();
})