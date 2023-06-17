import express, { Router } from 'express';
import {
  registerCoach,
  getAllCoaches,
  getCoachById,
  updateCoach,
  deleteCoach,
} from "../controllers/coachController";
import { verifyJWT } from "../middleware/verifyJWT"

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coaches
 *   description: API endpoints for coaches
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coach:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - username
 *         - email
 *         - password
 */

/**
 * @swagger
 * /coaches/register:
 *   post:
 *     summary: Register a new coach
 *     tags: [Coaches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CoachRegistration'
 *     responses:
 *       200:
 *         description: Coach registered successfully
 *       500:
 *         description: Internal server error
 */
router.route('/register').post(registerCoach);

/**
 * @swagger
 * /coaches:
 *   get:
 *     summary: Get all coaches
 *     tags: [Coaches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coaches retrieved successfully
 *       500:
 *         description: Internal server error
 */

// Apply verifyJWT middleware to all routes below this line
router.use(verifyJWT);

router.route('/')
  .get(getAllCoaches);

/**
 * @swagger
 * /coaches/{id}:
 *   get:
 *     summary: Get a coach by ID
 *     tags: [Coaches]
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
 *         description: Coach retrieved successfully
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a coach
 *     tags: [Coaches]
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
 *             $ref: '#/components/schemas/CoachRegistration'
 *     responses:
 *       200:
 *         description: Coach updated successfully
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a coach
 *     tags: [Coaches]
  *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Coach deleted successfully
 *       404:
 *         description: Coach not found
 *       500:
 *         description: Internal server error
 */
router.route('/:id')
  .get(getCoachById)
  .put(updateCoach)
  .delete(deleteCoach);

export default router;
