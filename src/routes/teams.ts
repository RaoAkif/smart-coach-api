import express from 'express';
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam, getPlayersInTeam} from "../controllers/teamController"

const router = express.Router();

router.route('/')
  .post(createTeam)
  .get(getAllTeams);

router.route('/:id')
  .get(getTeamById)
  .put(updateTeam)
  .delete(deleteTeam);

router.route('/:id/players')
  .get(getPlayersInTeam);

export default router;