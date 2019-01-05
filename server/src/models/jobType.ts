import mongoose from 'mongoose';

export const JobTypeSchema = new mongoose.Schema({
  name: { type: String },
});

export const JobType = mongoose.model('JobType', JobTypeSchema);
