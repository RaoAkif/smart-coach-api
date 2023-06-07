import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Create a new user
// @route POST /users
// @access Private
export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    next(error)
  }
}

// @desc Create a new user
// @route POST /users
// @access Private
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

// @desc Update a user
// @route POST /users/1
// @access Private
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        username: username,
        email: email,
        password: password,
      },
    })
    res.json(updateUser)
  } catch (error) {
    next(error);
  }
}

// @desc Delete a user
// @route POST /users/1
// @access Private
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.json(deleteUser)
  } catch (error) {
    next(error);
  }
}
