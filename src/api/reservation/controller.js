import { success, notFound } from '../../services/response/';
import { Reservation } from '.';

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
