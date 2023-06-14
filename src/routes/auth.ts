import express, { Router } from 'express';
const router: Router = express.Router();
import { login, refresh, logout } from '../controllers/authController';

// Login
router.route("/login")
  .post(login);

  router.route('/refresh')
    .get(refresh)

router.route('/logout')
    .post(logout)
export default router;