import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { index, show, create, update, destroy } from './controller';
import { schema } from './model';
export Reservation, { schema } from './model';

const router = new Router();
const {address, description, services, status} = schema.tree;

/**
 * @api {get} /reservations Reservation providers
 * @apiName RetrieveReservations
 * @apiGroup Reservation
 * @apiPermission public
 * @apiUse listParams
 * @apiSuccess {Object[]} providers List of reservations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /reservations/:id Retrieve reservation
 * @apiName RetrieveReservation
 * @apiGroup Reservation
 * @apiPermission public
 * @apiSuccess {Object} provider Reservation's data.
 * @apiError 404 Reservation not found.
 */
router.get('/:id',
  show);

/**
 * @api {post} /reservations Create Reservation
 * @apiName CreateReservation
 * @apiGroup Reservation
 * @apiPermission public
 * @apiParam {String} address Reservation's address.
 * @apiParam {String} description Reservation's description.
 * @apiParam {String[]} services Reservation's services.
 * @apiParam {String} status Reservation's status.
 * @apiSuccess (Sucess 201) {Object} reservation Reservation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.post('/',
  body({address, description, services, status}),
  create);

/**
 * @api {put} /reservations/:id Update provider
 * @apiName UpdateReservation
 * @apiGroup Reservation
 * @apiPermission public
 * @apiParam {String} name Reservation's name.
 * @apiParam {String} address Reservation's address.
 * @apiParam {String} description Reservation's description.
 * @apiParam {Number} rating Reservation's rating.
 * @apiParam {String[]} services Reservation's services.
 * @apiParam {String} picture Reservation's picture.
 * @apiSuccess {Object} provider Reservation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reservation not found.
 */
router.put('/:id',
  body({address, description, services, status}),
  update);

/**
 * @api {delete} /reservations/:id Delete reservation
 * @apiName DeleteReservation
 * @apiGroup Reservation
 * @apiPermission public
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reservation not found.
 */
router.delete('/:id',
  destroy);

export default router;
