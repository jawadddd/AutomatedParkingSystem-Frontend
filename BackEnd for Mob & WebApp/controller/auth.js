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
      pass: 'hhvytvawppihugqt'//add here your gmail app pass
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
              console.log("Email sent to your entered email bro_"+email1);
          }
      });

      


    res.status(200).json({ message: 'Company admin Rejected successfully' });
  } catch (error) {
    console.error('Error accepting company admin:', error.message);
    console.log(email1)
    res.status(500).json({ error: 'Internal server error' });
  }  
}
const rejectModification= async(req,res)=>{
  const { name1, email1} = req.body;
  const nameIs=req.body.name1;
  const emailIs=req.body.email1;

 
  try {
    // Find the company admin by email
    const companyAdmin = await User.findOne({ email: email1 });

    if (!companyAdmin) {
      return res.status(404).json({ error: 'Company admin not found' });
    }

    // Update the modifiedStatus to 'false' means modification request is now handled
    companyAdmin.modifiedStatus = 'false';
    companyAdmin.modifiedFloorsPlan = null;
    companyAdmin.modifiedNoOfFloors = null;
    companyAdmin.modifiedNoOfSlots = null;
    await companyAdmin.save();

    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
      user: 'jawadhaider682@gmail.com',//add here your mail
      pass: 'hhvytvawppihugqt'//add here your gmail app pass
      },
      secure: true,
      });
      
      var mailOptions={
          from:'jawadhaider682@gmail.com',//add here your mail
          to:email1,//add here your mail 
          subject:"Your Modification Structure Request for Automated Parking System is Rejected",
          text:"Hi "+name1+".\n\n"+"Sorry!\nYour Modification Structure Request for Automated Parking System is Rejected.\n\nHave a nice day!",
      };
      transporter.sendMail(mailOptions,function(error,info){
          if(error)
          {
              console.log(error);
          }
          else
          {
              console.log("Email sent to your entered email bro_"+email1);
          }
      });

      


    res.status(200).json({ message: 'Rejected successfully' });
  } catch (error) {
    console.error('Error accepting company admin:', error.message);
    console.log(email1)
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
companyAdmin.verified="true";
    await companyAdmin.save();

    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
        user: 'jawadhaider682@gmail.com',//add here your mail
        pass: 'hhvytvawppihugqt'//add here your gmail app pass
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
 


const acceptModification= async(req,res)=>{
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

       // Update the modifiedStatus to 'false' means modification request is now handled
       companyAdmin.modifiedStatus = 'false';
       companyAdmin.floorsPlan= companyAdmin.modifiedFloorsPlan;
       companyAdmin.noOfFloors= companyAdmin.modifiedNoOfFloors;
       companyAdmin.noOfSlots= companyAdmin.modifiedNoOfSlots;
       companyAdmin.modifiedFloorsPlan = null;
       companyAdmin.modifiedNoOfFloors = null;
       companyAdmin.modifiedNoOfSlots = null;
   
    await companyAdmin.save();

    // The rest of your email sending logic...
    var transporter = nodemailer.createTransport({
      port: 465,
      host:"smtp.gmail.com",
      auth: {
        user: 'jawadhaider682@gmail.com',//add here your mail
        pass: 'hhvytvawppihugqt'//add here your gmail app pass
        },
      secure: true,

      });
      var mailOptions={
          from:'jawadhaider682@gmail.com',//add here your mail
          to:email1,//add here your mail 
          subject:"Your Modified Structure Request for Automated Parking System is Accepted",
          text:"Hi "+name1+".\n\n"+"Congratulations!\nYour Modification Structure Request for Automated Parking System is Accepted.\n Now Modified Structure will be used for your Automated Parking iot System, Company Admin Panel and mobile app.",
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

      


    res.status(200).json({ message: 'Accepted successfully' });
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
        pass: 'hhvytvawppihugqt'//add here your gmail app pass
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



const findVehicle = async (req, res) => {
  try {
    console.log("aya isme");
    const { VehicleIs, emailIs } = req.query;
console.log("req:",req.query);
    // Find companyAdmins
    const companyAdminn = await User.find({ email: emailIs });
console.log("companyAdmin is,",companyAdminn);
let companyAdmin=companyAdminn[0];
    let floorsPlann = companyAdmin.floorsPlan;
    console.log("No of Floors:" + floorsPlann.length);

    let foundCell = null;

    floorsPlann.some((floor, floorIndex) => {
      console.log(`Floor Number${floorIndex + 1}:`);
      console.log("Number of rows:" + floor.length);

      return floor.some((row, rowIndex) => {
        console.log("Number of cols:" + row.length);

        return row.some((cell, columnIndex) => {
          console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);
          
          // Check if cell.Vehicle is equal to VehicleIs
          if (cell.vehicle == VehicleIs) {
            foundCell = {
              floor: floorIndex + 1,
              row: rowIndex + 1,
              col: columnIndex + 1,
              Slot: cell.slotNo
            };
      
          }
        });
      });
    });


    if(foundCell)
    {
      console.log("Found Cell:", foundCell);
      res.status(200).json({success:true, matchingCell: foundCell });

    }
    else
    {

      console.log("No matching cell found");
      res.status(201).json({ success:false, message: "No matching cell found" });

    }
    

  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({success:false, error: "Internal Server Error" });
  }
};



const getSlots = async (req, res) => {
  try {
    console.log("aya isme");
    const { emailIs } = req.query;
    console.log("req:", req.query);

    // Find companyAdmins
    const companyAdminn = await User.find({ email: emailIs });
    console.log("companyAdmin is,", companyAdminn);
    let companyAdmin = companyAdminn[0];
    let floorsPlann = companyAdmin.floorsPlan;
    console.log("No of Floors:" + floorsPlann.length);

    // Array to hold the found cells
    let foundCells = [];

    floorsPlann.forEach((floor, floorIndex) => {
      console.log(`Floor Number${floorIndex + 1}:`);
      console.log("Number of rows:" + floor.length);

      floor.forEach((row, rowIndex) => {
        console.log("Number of cols:" + row.length);

        row.forEach((cell, columnIndex) => {
          console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);

          // Check if cell.status is equal to "Available"
          if (cell.name === "slot"||cell.name ==="Slot") {
            foundCells.push({
              floor: floorIndex + 1,
              row: rowIndex + 1,
              Status: cell.status,
              Slot: cell.slotNo,
              cost: cell.cost
            });
          }
        });
      });
    });

    if (foundCells.length > 0) {
      console.log("Found Cells:", foundCells);
      res.status(200).json({ success: true, MatchingCells: foundCells });
    } else {
      console.log("No matching cell found");
      res.status(404).json({ success: false, message: "No Slot!" });
    }

  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};



const getAvailableSlots = async (req, res) => {
  try {
    console.log("aya isme");
    const { emailIs } = req.query;
    console.log("req:", req.query);

    // Find companyAdmins
    const companyAdminn = await User.find({ email: emailIs });
    console.log("companyAdmin is,", companyAdminn);
    let companyAdmin = companyAdminn[0];
    let floorsPlann = companyAdmin.floorsPlan;
    console.log("No of Floors:" + floorsPlann.length);

    // Array to hold the found cells
    let foundCells = [];

    floorsPlann.forEach((floor, floorIndex) => {
      console.log(`Floor Number${floorIndex + 1}:`);
      console.log("Number of rows:" + floor.length);

      floor.forEach((row, rowIndex) => {
        console.log("Number of cols:" + row.length);

        row.forEach((cell, columnIndex) => {
          console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);

          // Check if cell.status is equal to "Available"
          if (cell.status === "Available"||cell.status === "available") {
            foundCells.push({
              floor: floorIndex + 1,
              row: rowIndex + 1,
              Status: cell.status,
              Slot: cell.slotNo
            });
          }
        });
      });
    });

    if (foundCells.length > 0) {
      console.log("Found Cells:", foundCells);
      res.status(200).json({ success: true, MatchingCells: foundCells });
    } else {
      console.log("No matching cell found");
      res.status(404).json({ success: false, message: "No Available Slot!" });
    }

  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getBookedSlots = async (req, res) => {
  try {
    console.log("aya isme");
    const { emailIs } = req.query;
    console.log("req:", req.query);

    // Find companyAdmins
    const companyAdminn = await User.find({ email: emailIs });
    console.log("companyAdmin is,", companyAdminn);
    let companyAdmin = companyAdminn[0];
    let floorsPlann = companyAdmin.floorsPlan;
    console.log("No of Floors:" + floorsPlann.length);

    // Array to hold the found cells
    let foundCells = [];

    floorsPlann.forEach((floor, floorIndex) => {
      console.log(`Floor Number${floorIndex + 1}:`);
      console.log("Number of rows:" + floor.length);

      floor.forEach((row, rowIndex) => {
        console.log("Number of cols:" + row.length);

        row.forEach((cell, columnIndex) => {
          console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);

          // Check if cell.status is equal to "Available"
          if (cell.status === "Booked"||cell.status === "booked") {
            foundCells.push({
              floor: floorIndex + 1,
              row: rowIndex + 1,
              Status: cell.status,
              Slot: cell.slotNo
            });
          }
        });
      });
    });

    if (foundCells.length > 0) {
      console.log("Found Cells:", foundCells);
      res.status(200).json({ success: true, MatchingCells: foundCells });
    } else {
      console.log("No matching cell found");
      res.status(404).json({ success: false, message: "No Booked Slot!" });
    }

  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getFilledSlots = async (req, res) => {
  try {
    console.log("aya isme");
    const { emailIs } = req.query;
    console.log("req:", req.query);

    // Find companyAdmins
    const companyAdminn = await User.find({ email: emailIs });
    console.log("companyAdmin is,", companyAdminn);
    let companyAdmin = companyAdminn[0];
    let floorsPlann = companyAdmin.floorsPlan;
    console.log("No of Floors:" + floorsPlann.length);

    // Array to hold the found cells
    let foundCells = [];

    floorsPlann.forEach((floor, floorIndex) => {
      console.log(`Floor Number${floorIndex + 1}:`);
      console.log("Number of rows:" + floor.length);

      floor.forEach((row, rowIndex) => {
        console.log("Number of cols:" + row.length);

        row.forEach((cell, columnIndex) => {
          console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);

          // Check if cell.status is equal to "Available"
          if (cell.status === "Filled"||cell.status === "filled") {
            foundCells.push({
              floor: floorIndex + 1,
              row: rowIndex + 1,
              Status: cell.status,
              Slot: cell.slotNo
            });
          }
        });
      });
    });

    if (foundCells.length > 0) {
      console.log("Found Cells:", foundCells);
      res.status(200).json({ success: true, MatchingCells: foundCells });
    } else {
      console.log("No matching cell found");
      res.status(404).json({ success: false, message: "No Filled Slot!" });
    }

  } catch (error) {
    console.error("Error fetching Ambassadors data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const setCost = async (req, res) => {
  try {
    const { floorNo, rowNo, slotNo, newCost, email } = req.body;
    console.log(req.body);

    // Find companyAdmin
    const companyAdmin = await User.findOne({ email: email });
    console.log("companyAdmin is,", companyAdmin);

    if (!companyAdmin) {
      return res.status(404).json({ success: false, message: "Company Admin not found!" });
    }

    let floorsPlan = companyAdmin.floorsPlan;
    console.log("No of Floors:", floorsPlan.length);

    let updated = false;

    const updatedFloorsPlan = floorsPlan.map((floor, floorIndex) => {
      if (floorIndex === floorNo - 1) { // Adjusting the floor index
        return floor.map((row, rowIndex) => {
          if (rowIndex === rowNo - 1) { // Adjusting the row index
            return row.map((cell) => {
              if (cell.slotNo === slotNo) {
                console.log("came here-------------");
                console.log(cell);

                // Create a new object instead of modifying the existing one
                const updatedCell = {
                  ...cell,
                  cost: newCost
                };

                console.log(updatedCell);
                updated = true;
                return updatedCell;
              }
              return cell;
            });
          }
          return row;
        });
      }
      return floor;
    });

    // Update the floorsPlan attribute of companyAdmin with the updated floorsPlan object
    if (updated) {
      console.log("here also came");
      companyAdmin.floorsPlan = updatedFloorsPlan;
      await companyAdmin.save();
      console.log("here not came");
      return res.status(200).json({ success: true, message: "Successfully Updated Cost." });
    } else {
      res.status(200).json({ success: false, message: "No cell Found!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error Occured!" });
  }
}


const setMapRange = async (req, res) => {
  try {
    const { email, MapRange } = req.body;
    console.log(req.body);

    // Find companyAdmin
    const companyAdmin = await User.findOne({ email: email });
    console.log("companyAdmin is,", companyAdmin);

    if (!companyAdmin) {
      return res.status(201).json({ success: false, message: "Company Admin not found!" });
    }
    else
    {
      companyAdmin.MapRange = MapRange;
    }
      await companyAdmin.save();
      console.log("here not came");
      return res.status(200).json({ success: true, message: "Map Range Set Successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An Error Occured" });
  }
}

const modify= async(req,res)=>{
  try {
    // Handle user registration here
   const {email,noOfFloors, noOfSlots, modifiedFloorsPlan }= req.body;
   
   console.log(req.body);
   console.log("caming0");


   let floorsPlann = JSON.parse(req.body.modifiedFloorsPlan);
   console.log("No of Floors:"+floorsPlann.length);
   floorsPlann.map((floor, floorIndex) => {
     console.log(`Floor Number${floorIndex + 1}:`);
     console.log("Number of rows:"+floor.length);
     floor.map((row, rowIndex) => {
       console.log("Number of cols:"+row.length);
       row.map((cell, columnIndex) => {
         console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);
       });
     });
   });        
   console.log("caming1");

         

    const existingUser = await User.findOne({ email });
  if(!existingUser)
  {
    res.status(500).json({ success: false, message: "Modification Request Failed!" });
  }   
  else
  {
    console.log("caming");
      existingUser.modifiedFloorsPlan = floorsPlann;
      existingUser.modifiedStatus = "true";//means modification request sent to super Admin
      existingUser.modifiedNoOfSlots = noOfSlots;
      existingUser.modifiedNoOfFloors = noOfFloors;

      await existingUser.save();

    return res.status(200).json({ success: true, message: "Modification Request Sent!"});

  }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An Error Occured!" });
    }
}

const register= async(req,res)=>{
    try {
      // Handle user registration here
     const { userName, email, password, contactNumber,noOfFloors, noOfSlots, floorsPlan,longitude,latitude }= req.body;
     console.log("came in register.",password);
     console.log(req.body);
     let floorsPlann = JSON.parse(req.body.floorsPlan);
     console.log("No of Floors:"+floorsPlann.length);
     floorsPlann.map((floor, floorIndex) => {
       console.log(`Floor Number${floorIndex + 1}:`);
       console.log("Number of rows:"+floor.length);
       floor.map((row, rowIndex) => {
         console.log("Number of cols:"+row.length);
         row.map((cell, columnIndex) => {
           console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);
         });
       });
     });        

      //let role="superAdmin";
      let role="companyAdmin";
      //let status="accepted";
      //let status="rejected";
      let status="pending";
 
      const image = req.files[0];
           

      const existingUser = await User.findOne({ email });
    if(!existingUser)
    {
      const user = new User({ userName, role, email, password, contactNumber,noOfFloors, noOfSlots, floorsPlan:floorsPlann, status,longitude,latitude  });
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
      console.log("here2");

      return res.status(201).json({ success: false, message: "No Account Exists" });
    }

    if(existingUser.role!=="superAdmin")
    {
      console.log("here");
      if(!existingUser.verified || existingUser.verified!=="true")
      {
        console.log("here1");

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
          return res.status(201).json({ success: false, message: "Invalid Password" });
        }
        else
        {
if(existingUser.status==="rejected")
{
  return res.status(201).json({ success: false, message: "Sorry, Your Request is Rejected after being reviewed. " });

}
else
{
  return res.status(201).json({ success: false, message: "Your Request is Sent to Admin but not Accepted Yet. \nTry to Login When you get Email From Admin About being Accepted. \n Stay Tuned!" });

}

                }
      }
      else
      {

        const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      console.log("her4");

      return res.status(201).json({ success: false, message: "Invalid Password" });
    }
    else
    {
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

    }
          }
  
    }
    else
    {
      console.log("here3");

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      console.log("her4");

      return res.status(201).json({ success: false, message: "Invalid Password" });
    }
    
    console.log("here5");

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
    })
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An Error Occured" });
  }
}





const getAdminByEmail = async (req, res) => {
  try {
    console.log("aya hai isme aab");
    const { email } = req.query;
    const adminn = await User.findOne({ email });
      const responseData = {
        completeObject:adminn
      };
      
console.log(responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Admin data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAdminObjectByEmail = async (req, res) => {
  try {
    console.log("aya hai isme aab");
    const { email } = req.query;
    console.log("email is :", email);
    const adminn = await User.findOne({ email });
    const responseData = {
      adminIs:adminn
    };
    
console.log(responseData);

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching Admin data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



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


const getModifiedRequests = async (req, res) => {
  try {
    console.log("aya isme");
    // Fetch Ambassadors data from your database (Assuming you have an Ambassador model)
    
    const superAdmin = await User.findOne({ role: 'superAdmin' });

    // Find companyAdmins
    const companyAdmins = await User.find({ role: 'companyAdmin', modifiedStatus: 'true' });

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

  module.exports={setCost,setMapRange,getSlots,getFilledSlots,getAvailableSlots,getBookedSlots, findVehicle,getAdminObjectByEmail,register,modify,verifyEmail,login,getAdmins,getModifiedRequests,getAdminByEmail,accept,acceptModification,reject,rejectModification,sendMessage};