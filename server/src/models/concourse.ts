import mongoose from 'mongoose';

export const ConcourseSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  concluded: { type: Boolean },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobType: { type: mongoose.Schema.Types.ObjectId, ref: 'JobType' },
  applicants: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean },
  }]
});

export const Concourse = mongoose.model('Concourse', ConcourseSchema);
