import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Register a new user
// @route POST /users
// @access Private
const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      } as User, // Explicitly cast data object to User
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
const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username
      }
    })
    if (user) {
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (validPassword) {
        res.json(user);
      } else {
        res.json("Wrong Credentials");
      }
    } else {
      res.json("User not found");
    }
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser
};