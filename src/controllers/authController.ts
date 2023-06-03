const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Register a new user
// @route POST /users
// @access Private
const registerUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true
      }
    })
    res.json(newUser);
  } catch (error) {
    next(error);
  }
}

// @desc Login a new user
// @route POST /users
// @access Private
const loginUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    validPassword? res.json(user) : res.json("Wrong Credentials")
    
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser
}