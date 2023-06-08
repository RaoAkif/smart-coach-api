import express from 'express';
import {
  addEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventWithPlayers,
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


export default router;
