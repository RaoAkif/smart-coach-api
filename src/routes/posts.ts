const router = require("express").Router();
const postController = require("../controllers/postController")

// Register
router.route("/")
  .post(postController.createPost)
  .get(postController.getAllPosts)

// Login
router.route("/:id")
  .get(postController.getPostById)
  .put(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router;
