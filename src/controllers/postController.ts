// const bcrypt = require("bcrypt");
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // @desc Create a New Post
// // @route POST /posts
// // @access Private
// const createPost = async (req, res, next) => {
//   const { title, description, userId } = req.body
//   try {
//     const newPost = await prisma.post.create({
//       data: {
//         title: title,
//         description: description,
//         userId: Number(userId)
//       }
//     })
//     res.json(newPost);
//   } catch (error) {
//     next(error);
//   }
// }

// // @desc Get All Posts
// // @route POST /posts
// // @access Private
// const getAllPosts = async (req, res, next) => {
//   try {
//     const posts = await prisma.post.findMany();
//     res.json(posts);
//   } catch (error) {
//     next(error)
//   }
// }

// // @desc Get a Post
// // @route POST /posts/1
// // @access Private
// const getPostById = async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const post = await prisma.post.findUnique({
//       where: {
//         id: Number(id),
//       },
//     })
//     res.json(post)
//   } catch (error) {
//     next(error)
//   }
// }

// // @desc Update a post
// // @route POST /posts/1
// // @access Private
// const updatePost = async (req, res, next) => {
//   try {
//     const { title, description, userId } = req.body
//     const updatedPost = await prisma.post.update({
//       where: {
//         id: Number(req.params.id)
//       },
//       data: {
//         title: title,
//         description: description,
//         userId: Number(userId)
//       }
//     })
//     res.json(updatedPost);
//   } catch (error) {
//     next(error);
//   }
// }

// // @desc Delete a post
// // @route POST /posts/1
// // @access Private
// const deletePost = async (req, res, next) => {
//   try {
//     const deletedPost = await prisma.post.delete({
//       where: {
//         id: Number(req.params.id)
//       }
//     })
//     res.json(deletedPost)
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = {
//   createPost,
//   getAllPosts,
//   getPostById,
//   updatePost,
//   deletePost
// }