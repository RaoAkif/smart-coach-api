import express from 'express';
import {
  addPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController';

const router = express.Router();

router.route('/')
  .post(addPlayer)
  .get(getAllPlayers);

router.route('/:id')
  .get(getPlayerById)
  .put(updatePlayer)
  .delete(deletePlayer);

export default router;
