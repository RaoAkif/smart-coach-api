import express, { Router } from 'express';
const router: Router = express.Router();
import { loginCoach, refreshCoach, logoutCoach } from '../controllers/coachAuthController';
import { loginPlayer, refreshPlayer, logoutPlayer } from '../controllers/playerAuthController';
import loginLimiter from '../middleware/loginLimiter';

// Login Coach
router.route("/coach/login")
  .post(loginLimiter, loginCoach);

  router.route('/coach/refresh')
    .get(refreshCoach)

router.route('/coach/logout')
    .post(logoutCoach)


// Login Player
router.route("/player/login")
  .post(loginLimiter, loginPlayer);

  router.route('/player/refresh')
    .get(refreshPlayer)

router.route('/player/logout')
    .post(logoutPlayer)

export default router;