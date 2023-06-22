import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Team, Player } from '@prisma/client';
const prisma = new PrismaClient();

// @desc Create a new Team
// @route POST /teams
// @access Private
export const createTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newTeam = await prisma.team.create({
      data: {
        "name": req.body.name,
        players: {
          connect: req.body.playerIds.map((id: number) => ({ id })),
        },
      },
      include: {
        players: true,
      },
    });
    res.json(newTeam);
  } catch (error) {
    next(error);
  }
};

// @desc Get all teams
// @route GET /teams
// @access Private
export const getAllTeams = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: true,
      },
    });
    res.json(teams);
  } catch (error) {
    next(error);
  }
};

// @desc Get a team by ID
// @route GET /teams/:id
// @access Private
export const getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const team = await prisma.team.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        players: true,
      },
    });
    res.json(team);
  } catch (error) {
    next(error);
  }
};

// @desc Update a team
// @route PUT /teams/:id
// @access Private
export const updateTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { playerIds } = req.body;

    const updatedTeam = await prisma.team.update({
      where: {
        id: Number(id),
      },
      data: {
        players: {
          set: playerIds.map((id: number) => ({ id })),
        },
      },
      include: {
        players: true,
      },
    });

    res.json(updatedTeam);
  } catch (error) {
    next(error);
  }
};

// @desc Delete a team
// @route DELETE /teams/:id
// @access Private
export const deleteTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTeam = await prisma.team.delete({
      where: {
        id: Number(id),
      },
      include: {
        players: true,
      },
    });
    res.json(deletedTeam);
  } catch (error) {
    next(error);
  }
};

