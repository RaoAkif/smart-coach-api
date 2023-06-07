import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Roster, Player } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Create a new Roster
// @route POST /rosters
// @access Private
export const createRoster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newRoster = await prisma.roster.create({
      data: {
        player: {
          connect: req.body.playerIds.map((id: number) => ({ id })),
        },
      },
      include: {
        player: true,
      },
    });
    res.json(newRoster);
  } catch (error) {
    next(error);
  }
};

// @desc Get all rosters
// @route GET /rosters
// @access Private
export const getAllRosters = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const rosters = await prisma.roster.findMany({
      include: {
        player: true,
      },
    });
    res.json(rosters);
  } catch (error) {
    next(error);
  }
};

// @desc Get a roster by ID
// @route GET /rosters/:id
// @access Private
export const getRosterById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const roster = await prisma.roster.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        player: true,
      },
    });
    res.json(roster);
  } catch (error) {
    next(error);
  }
};

// @desc Update a roster
// @route PUT /rosters/:id
// @access Private
export const updateRoster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { playerIds } = req.body;

    const updatedRoster = await prisma.roster.update({
      where: {
        id: Number(id),
      },
      data: {
        player: {
          set: playerIds.map((id: number) => ({ id })),
        },
      },
      include: {
        player: true,
      },
    });

    res.json(updatedRoster);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a roster
// @route DELETE /rosters/:id
// @access Private
export const deleteRoster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedRoster = await prisma.roster.delete({
      where: {
        id: Number(id),
      },
      include: {
        player: true,
      },
    });
    res.json(deletedRoster);
  } catch (error) {
    next(error);
  }
};

// @desc Get all players in a roster
// @route GET /rosters/:id/players
// @access Private
export const getPlayersInRoster = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const players = await prisma.player.findMany({
      where: {
        rosterId: Number(id),
      },
    });
    res.json(players);
  } catch (error) {
    next(error);
  }
};
