const Project= require('../models/Project');
const addProject=async(req,res)=>{
    try {
//    console.log(req.body);
 //     const { email, code } = req.body;


 res.status(200).json({ success: true, message: "Project Added"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Project Not Added"});
    }
  }


  const getProjects=async(req,res)=>{
    try {
//    console.log(req.body);
 //     const { email, code } = req.body;


 res.status(200).json({ success: true, message: "Projects Acheived"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Projects Not Acheived"});
    }
  }


 module.exports={addProject,getProjects}