import mongoose from 'mongoose';

export const UserTypeSchema = new mongoose.Schema({
  name: { type: String },
});

export const UserType = mongoose.model('UserType', UserTypeSchema);
