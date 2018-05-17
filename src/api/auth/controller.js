import { sign } from '../../services/jwt';
import { success } from '../../services/response/';
import { createView } from '../../services/view';

export const VIEW_FIELDS = [
  'email',
  'name',
  'role',
  'provider',
  'createdAt',
  'updatedAt'
];
const view = createView(VIEW_FIELDS);

export const login = ({ user }, res, next) =>
  sign(view(user))
    .then((token) => ({ token }))
    .then(success(res, 201))
    .catch(next);
