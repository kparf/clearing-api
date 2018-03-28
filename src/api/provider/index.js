import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { password as passwordAuth, master, token } from '../../services/passport';
import { index, show, create, update, destroy } from './controller';
import { schema } from './model';
export Provider, { schema } from './model';

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
  query(),
  index);

/**
 * @api {get} /providers/:id Retrieve provider
 * @apiName RetrieveProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess {Object} provider Provider's data.
 * @apiError 404 Provider not found.
 */
router.get('/:id',
  show);

/**
 * @api {post} /providers Create provider
 * @apiName CreateProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess (Sucess 201) {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  create);

/**
 * @api {put} /providers/:id Update provider
 * @apiName UpdateProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Provider not found.
 */
router.put('/:id',
  update);

/**
 * @api {delete} /providers/:id Delete provider
 * @apiName DeleteProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  destroy);

export default router;
