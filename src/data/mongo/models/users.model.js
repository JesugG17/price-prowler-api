import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: false,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Users = mongoose.model('User', userSchema);
