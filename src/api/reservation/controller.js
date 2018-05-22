import { success, notFound, badRequest } from '../../services/response/';
import { Reservation } from '.';
import { reservationSearch } from '../../services/resevation';
import {createView, createViewList} from '../../services/view';

export const VIEW_FIELDS = [
  'status',
  'address',
  'description',
  'services',
  'description',
  'providerId',
  'userId',
  'userEmail',
  'createdAt',
  'updatedAt'
];
const view = createView(VIEW_FIELDS);
const viewList = createViewList(VIEW_FIELDS);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reservation.find(query, select, cursor)
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then(view)
    .then(success(res))
    .catch(next);

export const create = ({ bodymen: { body } }, res, next) =>
  Reservation.create(body)
    .then(success(res, 201))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((reservation) => reservation ? Object.assign(reservation, body).save() : null)
    .then(view)
    .then(success(res))
    .catch(next);

export const confirm = ({ params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((reservation) => reservation ? Object.assign(reservation, {status: 'CONFIRMED'}).save() : null)
    .then(view)
    .then(success(res))
    .catch(next);

export const cancel = ({ body, params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((reservation) => reservation ? Object.assign(reservation, {status: 'CANCELLED', comment: body.comment}).save() : null)
    .then(view)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const search = ({ query }, res, next) => {
  let { provider, services, statuses } = query;
  if (provider) {
    let serviceList, statusesList;
    if (services) {
      serviceList = services.split(',');
    }
    if (statuses) {
      statusesList = statuses.split(',');
    }

    reservationSearch({
      provider,
      services: serviceList,
      statuses: statusesList
    })
      .then((reservations) => viewList(reservations, VIEW_FIELDS))
      .then(success(res))
      .catch(next);
  } else {
    badRequest(res);
  }
};
