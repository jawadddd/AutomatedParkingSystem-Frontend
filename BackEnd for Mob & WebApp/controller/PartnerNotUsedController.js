const Partner= require('../models/Partner');

const AddPartner= async(req,res)=>{
  try {
    // Handle user registration here
    const {
      fullName,
    } = req.body;
      const image = req.files[0];
          console.log("here");
          const newPartner = new Partner({
            fullName,
            
          });
        
      if (image) {
        const filePath = await storeFile(image, newPartner._id);
        console.log("filePath user: ", filePath);
        newPartner.image = filePath;
      }
          await newPartner.save();
          res.status(200).json({ success: true, message: "Partner Added."});   
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Partner Not Added" });
    }
}

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


  const getPartner= async(req,res)=>{
    // try {
    //   // Handle user registration here
    //   const {
    //     fullName,
    //   } = req.body;
    //     const image = req.files[0];
    //         console.log("here");
    //         const newPartner = new Partner({
    //           fullName,
              
    //         });
          
    //     if (image) {
    //       const filePath = await storeFile(image, newPartner._id);
    //       console.log("filePath user: ", filePath);
    //       newPartner.image = filePath;
    //     }
    //         await newPartner.save();
    //         res.status(200).json({ success: true, message: "Partner Added."});   
       
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ success: false, message: "Partner Not Added" });
    //   }
  }


 module.exports={AddPartner,getPartner}