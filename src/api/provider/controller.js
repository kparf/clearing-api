import { success, notFound } from '../../services/response/';
import { Provider } from '.';

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Provider.find(query, select, cursor)
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next);

export const create = ({ bodymen: { body } }, res, next) =>
  Provider.create(body)
    .then(success(res, 201))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? Object.assign(provider, body).save() : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next);
