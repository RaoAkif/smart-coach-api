import express, { Router } from 'express';
const router: Router = express.Router();
import { loginCoach } from '../controllers/authController';

// Login
router.route("/login")
  .post(loginCoach);

export default router;