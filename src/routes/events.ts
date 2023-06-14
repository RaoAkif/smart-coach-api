import express, { Router } from 'express';
import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventWithPlayers,
  updatePlayerAvailability,
  generateInvitationToken,
  showEventInvitation,
  updatePlayerAvailabilityFromInvitation,
} from '../controllers/eventController';
import { verifyJWT } from "../middleware/verifyJWT"

const router: Router = express.Router();

// Apply verifyJWT middleware to all routes below this line
router.use(verifyJWT);

router.route('/')
  .post(addEvent)
  .get(getAllEvents);

router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);

router.route('/:id/players')
  .get(getEventWithPlayers);

router.route('/:eventId/players/:playerId/availability')
  .post(updatePlayerAvailability);

router.route('/:eventId/generate-invitation')
  .post(generateInvitationToken);

router.route('/:eventId/:invitationToken')
  .get(showEventInvitation);

router.route('/:eventId/players/availability')
  .post(updatePlayerAvailabilityFromInvitation);

export default router;
