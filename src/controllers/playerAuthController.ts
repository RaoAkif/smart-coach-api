import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt, { Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();

// @desc Login a new player
// @route POST /player/login
// @access Private
export const loginPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const player = await prisma.player.findUnique({
      where: {
        username: req.body.username
      }
    })
    if (player) {
      const validPassword = req.body.password === player.password;

      if (validPassword) {
        const accessToken = jwt.sign(
          {
            "PlayerInfo": {
              "playerId": player.id
              // "username": player.username
            }
          },
          process.env.ACCESS_TOKEN_SECRET as Secret,
          { expiresIn: '7d' }
        )
    
        const refreshToken = jwt.sign(
          { "username": player.username },
          process.env.REFRESH_TOKEN_SECRET as Secret,
          { expiresIn: '28d' }
        )
    
        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
    
        res.json({ accessToken, id: player.id })
      } else {
        res.json("Wrong Credentials");
      }
    } else {
      res.json("Player not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc Refresh access token
// @route POST /auth/refresh
// @access Public
export const refreshPlayer = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as { username: string };

    if (typeof decoded !== 'object' || !('username' in decoded)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const player = await prisma.player.findUnique({
      where: {
        username: decoded.username
      }
    });

    if (!player) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const accessToken = jwt.sign(
      {
        "PlayerInfo": {
          "username": player.username
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

// @desc Logout player and clear cookies
// @route POST /auth/logout
// @access Public
export const logoutPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })

  res.status(204).json({ message: 'Logout successful' })
}
