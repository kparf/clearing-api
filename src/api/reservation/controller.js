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
    .then(success(res))
    .catch(next);

export const create = ({ bodymen: { body } }, res, next) =>
  Reservation.create(body)
    .then(success(res, 201))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? Object.assign(provider, body).save() : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Reservation.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const search = ({ query }, res, next) => {
  let { provider } = query;
  if (provider) {
    reservationSearch({ provider })
      .then((reservations) => viewList(reservations, VIEW_FIELDS))
      .then(success(res))
      .catch(next);
  } else {
    badRequest(res);
  }
};
