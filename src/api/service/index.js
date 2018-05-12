import { Router } from 'express';
import { index } from './controller';

const router = new Router();

/**
 * @api {get} /providers Retrieve providers
 * @apiName RetrieveProviders
 * @apiGroup Provider
 * @apiPermission public
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} providers List of providers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  index);

export default router;
