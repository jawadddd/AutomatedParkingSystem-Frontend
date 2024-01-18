const express=require('express');

const router=express.Router();//is k according require

const {getAdmins,register,verifyEmail,login,accept,reject,sendMessage}= require('../controller/auth');

router.post('/register',register);
router.post('/verifyEmail',verifyEmail);
router.post('/login',login);
router.get('/getAdmins',getAdmins);
router.post('/accept',accept);
router.post('/reject',reject);
router.post('/sendMessage',sendMessage);







module.exports=router;