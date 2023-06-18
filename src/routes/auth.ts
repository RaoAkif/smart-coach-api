import express, { Router } from 'express';
import { loginCoach, refreshCoach, logoutCoach } from '../controllers/coachAuthController';
import { loginPlayer, refreshPlayer, logoutPlayer } from '../controllers/playerAuthController';
import loginLimiter from '../middleware/loginLimiter';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for authentication
 */

/**
 * @swagger
 * /api/auth/coach/login:
 *   post:
 *     summary: Login as a coach
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/coach/login')
  .post(loginLimiter, loginCoach);

/**
 * @swagger
 * /api/auth/coach/refresh:
 *   get:
 *     summary: Refresh access token for a coach
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful token refresh
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/coach/refresh')
  .get(refreshCoach);

/**
 * @swagger
 * /api/auth/coach/logout:
 *   post:
 *     summary: Logout a coach and clear cookies
 *     tags: [Authentication]
 *     responses:
 *       204:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.route('/coach/logout')
  .post(logoutCoach);

/**
 * @swagger
 * /auth/player/login:
 *   post:
 *     summary: Login as a player
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/player/login')
  .post(loginLimiter, loginPlayer);

/**
 * @swagger
 * /auth/player/refresh:
 *   get:
 *     summary: Refresh access token for a player
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successful token refresh
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.route('/player/refresh')
  .get(refreshPlayer);

/**
 * @swagger
 * /auth/player/logout:
 *   post:
 *     summary: Logout a player and clear cookies
 *     tags: [Authentication]
 *     responses:
 *       204:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
router.route('/player/logout')
  .post(logoutPlayer);

export default router;