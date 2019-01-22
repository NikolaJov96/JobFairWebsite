import mongoose from 'mongoose';

export const FairSchema = new mongoose.Schema({
  EndDate: { type: Date },
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
  appliedCompanies: [{
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    package: { type: Number },
    additional: [{ type: Number }],
    accepted: { type: Boolean },
    stand: { type: Number },
    rejected: { type: Boolean },
    comment: { type: String },
  }],
  timetable: [{
    date: { type: Date },
    hour: { type: Number },
    type: { type: String },
    location: { type: Number },
    place: { type: Number },
  }],
  logoPath: { type: String },
  additionalPaths: [{ type: String }]
});

export const Fair = mongoose.model('Fair', FairSchema);
