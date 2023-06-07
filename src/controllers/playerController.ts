import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Player } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Create a new Player
// @route POST /players
// @access Private
export const addPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, number, rosterId } = req.body;

    const newPlayer = await prisma.player.create({
      data: {
        name,
        number,
        Roster: {
          connect: {
            id: rosterId,
          },
        },
      },
    });

    res.json(newPlayer);
  } catch (error) {
    next(error);
  }
};

// @desc Get all players
// @route GET /players
// @access Private
export const getAllPlayers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error);
  }
};

// @desc Get a player by ID
// @route GET /players/:id
// @access Private
export const getPlayerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const player = await prisma.player.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
};

// @desc Update a player
// @route PUT /players/:id
// @access Private
export const updatePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, number, rosterId } = req.body;

    const updatedPlayer = await prisma.player.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        number,
        Roster: {
          connect: {
            id: rosterId,
          },
        },
      },
    });

    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a player
// @route DELETE /players/:id
// @access Private
export const deletePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedPlayer = await prisma.player.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(deletedPlayer);
  } catch (error) {
    next(error);
  }
};
