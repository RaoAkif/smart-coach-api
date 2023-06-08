import express from 'express';
import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventWithPlayers,
  updatePlayerAvailability,
  generateInvitationToken,
  getEventByInvitationToken,
  updatePlayerAvailabilityUsingForm,
} from '../controllers/eventController';

const router = express.Router();

router.route('/')
  .post(addEvent)
  .get(getAllEvents);

router.route('/:id')
  .get(getEventById)
  .put(updateEvent)
  .delete(deleteEvent);
  
router.route('/:id/players')
  .get(getEventWithPlayers)
  
  router.route('/:eventId/players/:playerId/availability')
  .put(updatePlayerAvailability)
  
  router.route('/:eventId/generate-invitation')
  .post(generateInvitationToken)
  
router.route('/:eventId/:invitationToken')
  .get(getEventByInvitationToken)

router.route('/:eventId/players/:playerId/availability')
.put(updatePlayerAvailabilityUsingForm);

export default router;
