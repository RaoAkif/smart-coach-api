import express, { Router } from 'express';
import {
  addPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController';
import { verifyJWT } from "../middleware/verifyJWT"

const router: Router = express.Router();

// Apply verifyJWT middleware to all routes below this line
router.use(verifyJWT);

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: API endpoints for players
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         number:
 *           type: integer
 *         position:
 *           type: string
 *       required:
 *         - name
 *         - username
 *         - email
 *         - number
 *         - position
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all players
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of players retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.route('/')
  .post(addPlayer)
  .get(getAllPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Get a player by ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player retrieved successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a player
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id')
  .get(getPlayerById)
  .put(updatePlayer)
  .delete(deletePlayer);

export default router;
