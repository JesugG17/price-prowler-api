import mongoose from 'mongoose';

const trackingSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  lastChecked: {
    type: Date,
    required: true,
  },
  currentPrice: {
    type: String,
    required: false,
    default: null,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'Users',
    required: true,
  },
});

export const Tracks = mongoose.model('Tracks', trackingSchema);
