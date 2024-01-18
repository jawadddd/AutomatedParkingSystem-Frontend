const express=require('express');

const router=express.Router();//is k according require
//const authenticateUser = require('../middleware/authentication');

const {AddPartner}= require('../controller/PartnerNotUsedController');

router.post('/AddPartner',AddPartner);

module.exports=router;