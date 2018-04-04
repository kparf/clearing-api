import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  }
}, {
  timestamps: true
});

const model = mongoose.model('Service', serviceSchema);

export const schema = model.schema;
export default model;
