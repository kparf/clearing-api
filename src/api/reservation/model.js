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
    default: 'NEW',
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
    ],
    validate: {
      validator: (v) => {
        return v.length > 0;
      },
      message: '{VALUE} must contain at least one item'
    },
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  userId: {
    type: String
  },
  userEmail: {
    type: String
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

const model = mongoose.model('Reservation', reservationSchema);

export const schema = model.schema;
export default model;
