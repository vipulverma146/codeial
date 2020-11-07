const express=require('express');

const router=express.Router();

const postsApi=require('../../../controllers/api/v2/post-api');

router.get('/',postsApi.index);




module.exports=router;