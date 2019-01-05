import mongoose from 'mongoose';

export const DeadlineDateSchema = new mongoose.Schema({
  studentStart: { type: Date },
  studentEnd: { type: Date },
  companyStart: { type: Date },
  companyEnd: { type: Date },
});

export const DeadlineDate = mongoose.model('DeadlineDate', DeadlineDateSchema);
