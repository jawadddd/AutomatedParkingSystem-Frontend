const mongoose= require('mongoose');


const partnerSchema = new mongoose.Schema({
    fullName: { type: String},
    image: { type: String},
  });

  module.exports= mongoose.model('Partner',partnerSchema);
  