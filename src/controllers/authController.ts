import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// @desc Login a new coach
// @route POST /coaches
// @access Private
export const loginCoach = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coach = await prisma.coach.findUnique({
      where: {
        username: req.body.username
      }
    })
    if (coach) {
      const validPassword = await (req.body.password, coach.password);

      if (validPassword) {
        res.json(coach);
      } else {
        res.json("Wrong Credentials");
      }
    } else {
      res.json("Coach not found");
    }
  } catch (error) {
    next(error);
  }
};
