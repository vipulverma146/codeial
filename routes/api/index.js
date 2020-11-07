// root index for api folder i.e. if APi contains's more than 1 version

const express=require('express');

const router=express.Router();

router.use('/v1',require('./v1'));




module.exports=router;