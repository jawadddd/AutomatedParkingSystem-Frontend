const mongoose= require('mongoose');


const projectSchema = new mongoose.Schema({
    chain: { type: String },
    category: { type: String },
    sortbyy: { type: String},
    tge: { type: String },
    special: { type: Boolean},
    stage: { type: String},
    location: { type: String},
    title: { type: String},
    investoramount: { type: String},
    raisedmoney: { type: String},
    mininvestment: { type: String },
    valuationcap: { type: String},
    description: { type: String},
    logo: { type: String},
    image: { type: String},
    maxInvestment: String,
    fundingGoal: String,
    tgeDate: String,
    allocation: String,
    browsecLink: String,
    redditLink: String,
    twitterLink: String,
    videoUrl:String,
    videoChoice:String,
    video: String, // Store the path to the video file
    discountedValuationCap: String,
    discount: String,
    deadline: String,
    securityType: String,
    nomineeLead: String,
    pictures: [String],
    highlightsStatements: [String],
    utilityStatements: [String],
    uspStatements: [String],
    roadMapStatements: [String],
    revenueStreamStatements: [String],
    technologyStatements: [String],
    marketingStrategyStatements: [String],
    tokenomicStatements: [String],  
    partners: [
      {
        name: String,
        title: String,
        description: String,
        profilePhoto: String, // Store the path to the partner's profile photo
        linkedinLink: String,
      },
    ],
    docs: [
      {
        docName: String,
        docFile: String, // Store the path to the partner's profile photo
              },
    ],
    teamMembers: [
      {
        name: String,
        title: String,
        description: String,
        profilePhoto: String, // Store the path to the partner's profile photo
        linkedinLink: String,
      },
    ],
  });
  module.exports= mongoose.model('Project',projectSchema);
  