import express, { Router } from 'express';
import { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } from "../controllers/teamController";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: API endpoints for teams
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Team:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         players:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *       required:
 *         - name
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team created successfully
 *       500:
 *         description: Internal server error
 *   get:
 *     summary: Get all teams
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teams retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.route('/')
  .post(createTeam)
  .get(getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by ID
 *     tags: [Teams]
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
 *         description: Team retrieved successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a team
 *     tags: [Teams]
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
 *             $ref: '#/components/schemas/Team'
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a team
 *     tags: [Teams]
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
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id')
  .get(getTeamById)
  .put(updateTeam)
  .delete(deleteTeam);

/**
 * @swagger
 * /teams/{id}/players:
 *   get:
 *     summary: Get all players in a team
 *     tags: [Teams]
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
 *         description: List of players in the team retrieved successfully
 *       404:
 *         description: Team not found
 *       500:
 *         description: Internal server error
 */

export default router;
