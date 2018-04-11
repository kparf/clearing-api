import { sign } from '../../services/jwt';
import { success } from '../../services/response/';
import {createView} from '../../services/view';

export const VIEW_FIELDS = [
  'email',
  'name',
  'role',
  'createdAt',
  'updatedAt'
];
const view = createView(VIEW_FIELDS);

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) => ({ token, user: view(user) }))
    .then(success(res, 201))
    .catch(next);
