const router = require("express").Router();
const userController = require("../controllers/userController")

// Register
router.route("/")
  .get(userController.getAllUsers)

// Login
router.route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router;
