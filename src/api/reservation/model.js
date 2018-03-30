import mongoose, { Schema } from 'mongoose';
import services from '../../data/services.json';

const serviceIds = services.map(service => service.id);
const statuses = [
  'NEW',
  'CONFIRMED',
  'CANCELLED'
];

const reservationSchema = new Schema({
  status: {
    type: String,
    enum: statuses
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  services: {
    type: [
      {
        type: String,
        enum: serviceIds
      }
    ]
  },
}, {
  timestamps: true
});

const model = mongoose.model('Reservation', reservationSchema);

export const schema = model.schema;
export default model;
