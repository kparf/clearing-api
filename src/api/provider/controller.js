import { success, notFound } from '../../services/response/';
import { Provider } from '.';
import { createView, createViewList } from '../../services/view';
import { register, verifyProvider } from '../../services/provider';

export const VIEW_FIELDS = [
  'email',
  'name',
  'address',
  'role',
  'description',
  'rating',
  'services',
  'createdAt',
  'updatedAt'
];
const view = createView(VIEW_FIELDS);
const viewList = createViewList(VIEW_FIELDS);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Provider.find(query, select, cursor)
    .then((providers) => viewList(providers, VIEW_FIELDS))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => view(provider))
    .then(success(res))
    .catch(next);

export const create = ({ bodymen: { body } }, res, next) =>
  register(body)
    .then((provider) => view(provider))
    .then(success(res, 201))
    .catch(next);

export const verify = ({ params }, res, next) =>
  verifyProvider(params.verificationKey)
    .then((provider) => view(provider))
    .then(success(res, 201))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? Object.assign(provider, body).save() : null)
    .then((provider) => view(provider))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Provider.findById(params.id)
    .then(notFound(res))
    .then((provider) => provider ? provider.remove() : null)
    .then(success(res, 204))
    .catch(next);
