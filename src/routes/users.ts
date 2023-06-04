import express, { Router } from 'express';
const router: Router = express.Router();
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController"

router.route("/")
  .get(getAllUsers)

router.route("/:id")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

export default router;
