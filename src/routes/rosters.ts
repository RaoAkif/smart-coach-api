import express from 'express';
import { createRoster, getAllRosters, getRosterById, updateRoster, deleteRoster, getPlayersInRoster} from "../controllers/rosterController"

const router = express.Router();

router.route('/')
  .post(createRoster)
  .get(getAllRosters);

router.route('/:id')
  .get(getRosterById)
  .put(updateRoster)
  .delete(deleteRoster);

router.route('/:id/players')
  .get(getPlayersInRoster);

export default router;