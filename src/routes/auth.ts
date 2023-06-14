import express, { Router } from 'express';
const router: Router = express.Router();
import { login, refresh, logout } from '../controllers/authController';
import loginLimiter from '../middleware/loginLimiter';

// Login
router.route("/login")
  .post(loginLimiter, login);

  router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)
export default router;