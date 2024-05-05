const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({
    userName:{
      type:String,
    }
    ,role:{
      type:String,
    }
    ,email:{
      type:String,
    },
    contactNumber:{
      type:String,
    }
    ,password:{
      type:String,
    }
    ,verified:{
      type:String,
    },
    noOfFloors:{
      type:Number,
    },
    modifiedNoOfFloors:{
      type:Number,
    }
    ,noOfSlots:{
      type:Number,
    }
    ,modifiedNoOfSlots:{
      type:Number,
    }
    ,status:{
      type:String,
    }
    ,MapRange:{
      type:String,
    },

    profilePhoto:
    {
      type:String,
    },
    longitude:
    {
      type: String,
    },
    latitude:
    {
      type: String,
    },
    floorsPlan: 
    {
      type: [[[{
        name: String,
        status: String,
        slotNo: String,
        cost: String,
        vehicle: String,
      }]]],
    },
    modifiedFloorsPlan: 
    {
      type: [[[{
        name: String,
        status: String,
        slotNo: String,
        cost: String,
        vehicle: String,
      }]]],
    },
    modifiedStatus:{
      type:String,
    },

  });

  
AdminSchema.pre('save', async function () {
  //when i modify object it again modify the password, why? apply condition
    if (!this.isModified('password'))
    {
      console.log("ayahai");
      return;
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
  })
  
  AdminSchema.methods.createJWT = function () {
    console.log("id:"+this._id+" , name: "+this.userName);
    return jwt.sign(
      { userId: this._id, name: this.userName },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }
  
  
  module.exports = mongoose.model('Admin', AdminSchema)
  