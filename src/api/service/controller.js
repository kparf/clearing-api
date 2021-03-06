import { success, notFound } from '../../services/response/';
import { Service } from '.';
import { createViewList } from '../../services/view';

const viewList = createViewList(['name', 'createdAt']);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Service.find(query, select, cursor)
    .then((services) => viewList(services))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then(success(res))
    .catch(next);

export const create = ({body}, res, next) => {
  let services = [];
  if (Array.isArray(body)) {
    services = body.map(service => {
      return { _id: service.id, name: service.name };
    });
  } else {
    services = { _id: body.id, name: body.name };
  }
  return Service.insertMany(services)
    .then(success(res, 201))
    .catch(next);
};

export const update = ({ bodymen: { body }, params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? Object.assign(provider, body).save() : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Service.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next);
