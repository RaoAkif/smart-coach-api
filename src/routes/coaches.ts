import express, { Router } from 'express';
import { registerCoach, getAllCoaches, getCoachById, updateCoach, deleteCoach } from "../controllers/coachController";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = express.Router();

// Register
router.route("/register").post(registerCoach);

// Apply verifyJWT middleware to all routes below this line
router.use(verifyJWT);

router.route("/")
  .get(getAllCoaches)

router.route("/:id")
  .get(getCoachById)
  .put(updateCoach)
  .delete(deleteCoach)

export default router;
