// root index for version 1 api-----> v1


const express=require('express');

const router=express.Router();

router.use('/postsApi',require('./postsApi'));




module.exports=router;