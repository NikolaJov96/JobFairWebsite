import mongoose from 'mongoose';

export const IndustrySchema = new mongoose.Schema({
  name: { type: String },
});

export const Industry = mongoose.model('Industry', IndustrySchema);
