import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

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
      const validPassword = req.body.password === coach.password;

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

// @desc Refresh access token
// @route POST /auth/refresh
// @access Public
export const refreshCoach = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as { username: string };

    if (typeof decoded !== 'object' || !('username' in decoded)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const coach = await prisma.coach.findUnique({
      where: {
        username: decoded.username
      }
    });

    if (!coach) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const accessToken = jwt.sign(
      {
        "CoachInfo": {
          "username": coach.username
        }
      },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: '15m' }
    );

    return res.json({ accessToken });
  } catch (error) {
    next(error);
  }

  // Add the following return statement as the last line
  throw new Error('Unexpected error occurred'); // You can replace this with an appropriate error response
};

// @desc Logout coach and clear cookies
// @route POST /auth/logout
// @access Public
export const logoutCoach = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.status(204).json({ message: 'Logout successful' })
}
