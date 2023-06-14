import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Coach } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Register a new coach
// @route POST /coaches
// @access Private
export const registerCoach = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newCoach = await prisma.coach.create({
      data: {
        name: req.body.name,    
        username: req.body.username,    
        email: req.body.email,
        password: req.body.password,
      } as Coach, // Explicitly cast data object to Coach
      select: {
        username: true,
        email: true
      }
    })
    res.json(newCoach);
  } catch (error) {
    next(error);
  }
}

// @desc Create a new coach
// @route POST /coaches
// @access Private
export const getAllCoaches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coaches = await prisma.coach.findMany();
    res.json(coaches);
  } catch (error) {
    next(error)
  }
}

// @desc Create a new coach
// @route POST /coaches
// @access Private
export const getCoachById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const coach = await prisma.coach.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(coach)
  } catch (error) {
    next(error)
  }
}

// @desc Update a coach
// @route POST /coaches/1
// @access Private
export const updateCoach = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password } = req.body

    const updateCoach = await prisma.coach.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        username: username,
        email: email,
        password: password,
      },
    })
    res.json(updateCoach)
  } catch (error) {
    next(error);
  }
}

// @desc Delete a coach
// @route POST /coaches/1
// @access Private
export const deleteCoach = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleteCoach = await prisma.coach.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.json(deleteCoach)
  } catch (error) {
    next(error);
  }
}
