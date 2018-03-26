import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
  name: {
    type: String,
    index: true,
    trim: true
  },
  address: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  },
  serviceTypes: {

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
