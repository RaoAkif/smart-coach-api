import express, { Router } from 'express';
const router: Router = express.Router();
import { registerCoach, getAllCoaches, getCoachById, updateCoach, deleteCoach } from "../controllers/coachController"
import { verifyJWT } from "../middleware/verifyJWT"

router.use(verifyJWT)

// Register
router.route("/register")
  .post(registerCoach);


router.route("/")
  .get(getAllCoaches)

router.route("/:id")
  .get(getCoachById)
  .put(updateCoach)
  .delete(deleteCoach)

export default router;
