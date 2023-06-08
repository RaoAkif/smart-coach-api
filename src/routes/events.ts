import express from 'express';
import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventWithPlayers,
  updatePlayerAvailability,
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

  router.route('/:id/players/:playerId/availability')
  .get(updatePlayerAvailability)


export default router;
