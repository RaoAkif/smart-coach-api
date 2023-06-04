import express, { Router } from 'express';
const router: Router = express.Router();
import { registerUser, loginUser } from '../controllers/authController';

// Register
router.route("/register")
  .post(registerUser);

// Login
router.route("/login")
  .post(loginUser);

export default router;