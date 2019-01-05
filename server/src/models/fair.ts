import mongoose from 'mongoose';

export const FairSchema = new mongoose.Schema({
  Fairs: [{
    Fair: { type: String },
    StartDate: { type: Date },
    EndDate: { type: Date },
    StartTime: { type: String },
    EndTime: { type: String },
    Place: { type: String },
    About: { type: String },
  }],
  Locations: [{
    Place: { type: String },
    Location: [{  
      Name: { type: String } 
    }],
  }],
  Packages: [{
    Title: { type: String },
    Content: [String],
    VideoPromotion: { type: String },
    NoLessons: { type: String },
    NoWorkchops: { type: String },
    NoPresentation: { type: String },
    Price: { type: Number },
    MaxCompanies: { type: String },
  }],
  Additional: [{
    Title: { type: String },
    Price: { type: Number },
  }],
  appliedCompanies:[{
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    package: { type: Number },
    additional: [{ Number }],
    accepted: { type: Boolean },
    rejected: { type: Boolean },
    comment: { type: String },
  }]
});

export const Fair = mongoose.model('Fair', FairSchema);
