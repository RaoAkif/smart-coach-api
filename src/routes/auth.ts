import express, { Express } from 'express';
const router: Express = express.Router();
const authController = require("../controllers/authController")

// Register
router.route("/register")
  .post(authController.registerUser)

// Login
router.route("/login")
  .post(authController.loginUser)

module.exports = router;
