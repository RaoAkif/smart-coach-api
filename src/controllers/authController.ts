import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();

console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
console.log('REFRESH_TOKEN_SECRET:', process.env.REFRESH_TOKEN_SECRET);

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
        const accessToken = jwt.sign(
          {
            "CoachInfo": {
              "coachId": coach.id
              // "username": coach.username
            }
          },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: '7d' }
        )
    
        const refreshToken = jwt.sign(
          { "username": coach.username },
          process.env.REFRESH_TOKEN_SECRET as Secret,
          { expiresIn: '28d' }
        )
    
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
    
        res.json({ accessToken, id: coach.id })
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
