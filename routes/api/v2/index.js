
const express=require('express');

const router=express.Router();

router.use('/postsApi',require('./postApi'));




module.exports=router;