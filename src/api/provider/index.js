import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { password as passwordAuth, master, token } from '../../services/passport';
import { index, show, create, update, destroy, verify } from './controller';
import { schema } from './model';
import { schema as userSchema } from '../user';
export Provider, { schema } from './model';

const router = new Router();
const { address, description, rating, services } = schema.tree;
const { name, email, password, picture } = userSchema.tree;

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
 * @api {post} /providers Create user with role 'provider' and related Provider object.
 * @apiName CreateProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiParam {String} name Provider's name.
 * @apiParam {String} email Provider's email.
 * @apiParam {String} address Provider's address.
 * @apiParam {String} description Provider's description.
 * @apiParam {Number} rating Provider's rating.
 * @apiParam {String[]} services Provider's services.
 * @apiParam {String} picture Provider's picture.
 * @apiSuccess (Suсcess 201) {Object} user with role 'provider'.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  body({name, email, address, description, rating, services, picture, password}),
  create);

/**
 * @api {post} /providers/verify/:verificationKey verify provider
 * @apiName VerifyProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess (Sucсess 201) {Object} provider Provider's data.
 * @apiError {Object} 400 Provider is not confirmed.
 */
router.post('/verify/:verificationKey',
  verify);

/**
 * @api {put} /providers/:id Update provider
 * @apiName UpdateProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiParam {String} name Provider's name.
 * @apiParam {String} address Provider's address.
 * @apiParam {String} description Provider's description.
 * @apiParam {Number} rating Provider's rating.
 * @apiParam {String[]} services Provider's services.
 * @apiParam {String} picture Provider's picture.
 * @apiSuccess {Object} provider Provider's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Provider not found.
 */
router.put('/:id',
  body({name, address, description, rating, services, picture}),
  update);

/**
 * @api {delete} /providers/:id Delete provider
 * @apiName DeleteProvider
 * @apiGroup Provider
 * @apiPermission public
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Provider not found.
 */
router.delete('/:id',
  destroy);

export default router;
