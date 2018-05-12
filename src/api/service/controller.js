import { success } from '../../services/response/';
import services from '../../data/services.json';

export const index = (req, res, next) => {
  return Promise.resolve(success(res)(services));
};
