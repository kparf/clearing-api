import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { index, show, create, update, destroy } from './controller';
import { schema } from './model';
export Service, { schema } from './model';

const router = new Router();
const { name } = schema.tree;

/**
 * @api {get} /services Retrieve service
 * @apiName RetrieveServices
 * @apiGroup Service
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess {Object[]} providers List of services.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /services/:id Retrieve Service
 * @apiName RetrieveService
 * @apiGroup Service
 * @apiPermission public
 * @apiSuccess {Object} provider Service's data.
 * @apiError 404 Service not found.
 */
router.get('/:id',
  show);

/**
 * @api {post} /services Create Service
 * @apiName CreateService
 * @apiGroup Service
 * @apiPermission public
 * @apiParam {String} id Service's address.
 * @apiParam {String} name Service's name.
 * @apiSuccess (Success 201) {Object} service Service's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  body([{id: {type: String}, name}]),
  create);

/**
 * @api {put} /services/:id Update service
 * @apiName UpdateService
 * @apiGroup Service
 * @apiPermission public
 * @apiParam {String} name Service's name.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Service not found.
 */
router.put('/:id',
  body({name}),
  update);

/**
 * @api {delete} /services/:id Delete service
 * @apiName DeleteService
 * @apiGroup Service
 * @apiPermission public
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Service not found.
 */
router.delete('/:id',
  destroy);

export default router;
