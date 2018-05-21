import { Reservation } from '../../api/reservation';

export function reservationSearch ({ provider, services, statuses }) {

  let query = { providerId: provider };
  if (services && services.length > 0) {
    query.services = {
      $all: services
    };
  }
  if (statuses && statuses.length > 0) {
    query.status = {
      $in: statuses
    };
  }

  return Reservation.find(query);
}
