import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType' },
  stu: { type: {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
    year: { type: Number },
    graduated: { type: Boolean },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Concourse' }],
  } },
  com: { type: {
    name: { type: String },
    city: { type: String },
    director: { type: String },
    texNumber: { type: String },
    employees: { type: Number },
    website: { type: String },
    industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry' },
    field: { type: String },
    concourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Concourse' }],
  } }, 
  adm: { type: {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: Number },
  } }, 
});

export const User = mongoose.model('User', UserSchema);
