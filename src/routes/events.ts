import express, { Router } from 'express';
import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventWithPlayers,
  updatePlayerAvailability,
} from '../controllers/eventController';
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API endpoints for events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         event_type:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           format: time
 *         location:
 *           type: string
 *         details:
 *           type: string
 *         teamId:
 *           type: integer
 *       required:
 *         - event_type
 *         - date
 *         - time
 *         - location
 *         - details
 *         - teamId
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.route('/')
  .post(addEvent)
  .get(getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

/**
 * @swagger
 * /events/{id}/players:
 *   get:
 *     summary: Get an event and its players in the team
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event and its players retrieved successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id/players')
  .get(getEventWithPlayers);

/**
 * @swagger
 * /events/{eventId}/players/{playerId}/availability:
 *   post:
 *     summary: Update the availability status of a player in an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability_status:
 *                 type: string
 *             required:
 *               - availability_status
 *     responses:
 *       200:
 *         description: Player's availability status updated successfully
 *       404:
 *         description: Event or player not found
 *       500:
 *         description: Internal server error
 */
router.route('/:eventId/players/:playerId/availability')
  .post(updatePlayerAvailability);

export default router;
