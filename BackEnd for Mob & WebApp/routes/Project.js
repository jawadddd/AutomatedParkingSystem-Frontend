const express=require('express');

const router=express.Router();//is k according require
const authenticateUser = require('../middleware/authentication');

const {addProject,getProjects}= require('../controller/Project');

router.post('/addProject',addProject);
router.post('/getProjects',getProjects);

module.exports=router;