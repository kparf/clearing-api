import { Reservation } from '../../api/reservation';

export function reservationSearch ({ provider }) {
  return Reservation.find({ providerId: provider });
}
