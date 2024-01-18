const User= require('../models/Admin')
const nodemailer= require('nodemailer')
const bcrypt = require('bcryptjs');

function generateRandomPassword(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}
const reject= async(req,res)=>{
  const { name1, email1} = req.body;
  const nameIs=req.body.name1;
  const emailIs=req.body.email1;

 
  try {
    // Find the company admin by email
    const companyAdmin = await User.findOne({ email: email1 });

    if (!companyAdmin) {
      return res.status(404).json({ error: 'Company admin not found' });
    }

    // Update the status to 'accepted'
    companyAdmin.status = 'rejected';
    await companyAdmin.save();

    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
      user: 'jawadhaider682@gmail.com',//add here your mail
      pass: 'tfphhecamcfrxcew'//add here your gmail app pass
      },
      secure: true,
      });
      
      var mailOptions={
          from:'jawadhaider682@gmail.com',//add here your mail
          to:email1,//add here your mail 
          subject:"Your Request for Automated Parking System is Rejected",
          text:"Hi "+name1+".\n\n"+"Sorry!\nYour Request for Automated Parking System is Rejected.\n\nHave a nice day!",
      };
      transporter.sendMail(mailOptions,function(error,info){
          if(error)
          {
              console.log(error);
          }
          else
          {
              console.log("Email sent to your entered email bro_"+nameIs);
          }
      });

      


    res.status(200).json({ message: 'Company admin Rejected successfully' });
  } catch (error) {
    console.error('Error accepting company admin:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }  
}


const accept= async(req,res)=>{
  const { name1, email1 } = req.body;
  const nameIs=req.body.name1;
  const emailIs=req.body.email1;
  
  console.log("name is: "+name1);
  console.log("email is: "+email1);

  try {
    // Find the company admin by email
    const companyAdmin = await User.findOne({ email: email1 });

    if (!companyAdmin) {
      return res.status(404).json({ error: 'Company admin not found' });
    }
    const randd = generateRandomPassword(8);

    // Update the status to 'accepted'
    companyAdmin.status = 'accepted';
    companyAdmin.password=randd;//pichla password ni lena, yeh bd mai theek krna hai 

    await companyAdmin.save();

    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
      user: 'jawadhaider682@gmail.com',//add here your mail
      pass: 'tfphhecamcfrxcew'//add here your gmail app pass
      },
      secure: true,
      });
      var mailOptions={
          from:'jawadhaider682@gmail.com',//add here your mail
          to:email1,//add here your mail 
          subject:"Your Request for Automated Parking System is Accepted",
          text:"Hi "+name1+".\n\n"+"Congratulations!\nYour Request for Automated Parking System is Accepted.\nNow You can use Your Company Admin Panel on Our Website using following login Credentials,\nEmail : "+email1+"\n"+"Password : "+randd+"\n\nEnjoy your Automated Parking System.Have a nice day!",
      };
      transporter.sendMail(mailOptions,function(error,info){
          if(error)
          {
              console.log(error);
          }
          else
          {
              console.log("Email sent to your entered email bro_"+nameIs);
          }
      });

      


    res.status(200).json({ message: 'Company admin accepted successfully' });
  } catch (error) {
    console.error('Error accepting company admin:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }  

}
 






const sendMessage= async(req,res)=>{
  const { userEmail, message } = req.body;
  const emailIs=req.body.userEmail;
  const messageIs=req.body.message;
  console.log("email is: "+emailIs);

try{
    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
      user: 'jawadhaider682@gmail.com',//add here your mail
      pass: 'tfphhecamcfrxcew'//add here your gmail app pass
      },
      secure: true,
      });
      var mailOptions={
          from:'jawadhaider682@gmail.com',//add here your mail
          to:emailIs,//add here your mail 
          subject:"Message from Automated Parking System",
          text:messageIs,
      };
      transporter.sendMail(mailOptions,function(error,info){
          if(error)
          {
              console.log(error);
          }
          else
          {
              console.log("Email sent to your entered email bro_"+nameIs);
          }
      });

      


    res.status(200).json({ message: 'Msg Sent successfully' });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }  

}



const register= async(req,res)=>{
    try {
      // Handle user registration here
     const { userName, email, password, contactNumber, noOfFloors, noOfSlots  }= req.body;
     console.log("came in register.",password);
      //let role="superAdmin";
      let role="companyAdmin";
      //let status="accepted";
      //let status="rejected";
      let status="pending";
 
      const image = req.files[0];
           

      const existingUser = await User.findOne({ email });
    if(!existingUser)
    {
      const user = new User({ userName, role, email, password, contactNumber, noOfFloors, noOfSlots,status  });
      if (image) {
        const filePath = await storeFile(image, user._id);
        console.log("filePath user: ", filePath);
        user.profilePhoto = filePath;
      }

      await user.save();

      return res.status(200).json({ success: true, message: "Successfully Registered."});
    }   
    else
    {
      res.status(500).json({ success: false, message: "Registration failed" });
    }
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Registration failed" });
      }
  }


  
  
  const verifyEmail=async(req,res)=>{
    try {
      console.log(req.body);
      const { email, code } = req.body;
  
  
      // Find the user by email
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        console.log("nhi mila");
        return res.status(400).json({ success: false, message: "Invalid email" });
      }
  
      // Check if the verification code matches
      if (existingUser.code !== code) {
        console.log("wrong code");
        return res.status(400).json({ success: false, message: "Invalid verification code" });
      }
  
      // Update the user's verified status
      existingUser.verifieduser = true;

      console.log("ok");
  
      await existingUser.save();
  if(existingUser.category==="user"||existingUser.category===null)
{
  res.status(200).json({ success: true, message: "Email successfully verified!",User:{
    fullName: existingUser.fullName,
    email: existingUser.email,
  },});

}
else
{
  res.status(200).json({ success: true, message: "Email successfully verified & Your request for "+existingUser.category+" is sent to Admin.Keep Checking your mail.",User:{
    fullName: existingUser.fullName,
    email: existingUser.email,
  },});
}



    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Email verification failed" });
    }
  }





const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("email:"+email);
    // Find the user by email
    const existingUser = await User.findOne({ email });


    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Admin not Exist" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }
    

    const token =await existingUser.createJWT(); 
    console.log("okay",token);
    res.status(200).json({
      success: true,
      message: "Login Successful",
    token,
      User: {
        userName: existingUser.userName,
        email: existingUser.email,
        role:existingUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
}




const getAdmins = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    
    const superAdmin = await User.findOne({ role: 'superAdmin' });

    // Find companyAdmins
    const companyAdmins = await User.find({ role: 'companyAdmin' });

    // Prepare the response object
    const responseData = {
      superAdmin,
      companyAdmins,
    };
    
console.log(companyAdmins);
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const storeFile = async (file, id) => {
  console.log("file: ", file);
  const fs = require("fs");
  const path = require("path");
  const fileType = file.mimetype.split("/")[1];
  const filePath = path.join(__dirname, `../uploads`, `${id}.${fileType}`);
  console.log("filePath: ", filePath);
  fs.writeFileSync(filePath, file.buffer, function (err) {
    if (err) {
      console.log("error is", err);
    } else {
      console.log("file saved");
    }
  });
  return `${id}.${fileType}`;
};
//Project

  module.exports={register,verifyEmail,login,getAdmins,accept,reject,sendMessage};