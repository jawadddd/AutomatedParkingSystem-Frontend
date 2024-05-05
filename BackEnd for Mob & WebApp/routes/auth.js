const express=require('express');

const router=express.Router();//is k according require

const {setCost,setMapRange,getFilledSlots,getAvailableSlots,getBookedSlots,findVehicle,getAdminObjectByEmail,getAdmins,getModifiedRequests,register,modify,verifyEmail,login,accept,acceptModification,reject,rejectModification,sendMessage,getAdminByEmail, getSlots}= require('../controller/auth');

router.post('/register',register);
router.post('/modify',modify);
router.post('/setCost',setCost);
router.post('/setMapRange',setMapRange);

router.post('/verifyEmail',verifyEmail);
router.post('/login',login);


router.get('/getAdmins',getAdmins);
router.get('/getModifiedRequests',getModifiedRequests);


router.get('/getSlots',getSlots);


router.get('/getAdminByEmail',getAdminByEmail);
router.get('/getAdminObjectByEmail',getAdminObjectByEmail);
router.get('/findVehicle',findVehicle);
router.get('/getAvailableSlots',getAvailableSlots);
router.get('/getBookedSlots',getBookedSlots);
router.get('/getFilledSlots',getFilledSlots);

router.post('/accept',accept);
router.post('/acceptModification',acceptModification);

router.post('/reject',reject);
router.post('/rejectModification',rejectModification);


router.post('/sendMessage',sendMessage);







module.exports=router;