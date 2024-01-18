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
    },
    noOfFloors:{
      type:Number,
    }
    ,noOfSlots:{
      type:Number,
    }
    ,status:{
      type:String,
    },
    profilePhoto:
    {
      type:String,
    },
  });

  
AdminSchema.pre('save', async function () {
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
  