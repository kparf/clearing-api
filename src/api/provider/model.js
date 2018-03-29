import mongoose, { Schema } from 'mongoose';
import services from '../../data/services.json';

const serviceIds = services.map(service => service.id);

const serviceSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0
  },
  services: {
    type: [
      {
        type: String,
        enum: serviceIds
      }
    ]
  },
  picture: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const model = mongoose.model('Provider', serviceSchema);

export const schema = model.schema;
export default model;
