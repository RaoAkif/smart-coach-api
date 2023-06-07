import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Player } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Create a new Player
// @route POST /players
// @access Private
export const addPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUser = await prisma.player.create({
      data: {
        name: req.body.name
      } as Player, // Explicitly cast data object to User
    })
    res.json(newUser);
  } catch (error) {
    next(error);
  }
}

// @desc Get all players
// @route GET /players
// @access Private
export const getAllPlayers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error)
  }
}

// @desc Create a new player
// @route POST /players
// @access Private
export const getPlayerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const player = await prisma.player.findUnique({
      where: {
        id: Number(id),
      },
    })
    res.json(player)
  } catch (error) {
    next(error)
  }
}

// @desc Update a player
// @route POST /players/1
// @access Private
export const updatePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body

    const updatePlayer = await prisma.player.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
      },
    })
    res.json(updatePlayer)
  } catch (error) {
    next(error);
  }
}

// @desc Delete a player
// @route POST /players/1
// @access Private
export const deletePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deletePlayer = await prisma.player.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.json(deletePlayer)
  } catch (error) {
    next(error);
  }
}
