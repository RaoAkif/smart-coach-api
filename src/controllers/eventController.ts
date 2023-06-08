import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// @desc Create a new Event
// @route POST /events
// @access Private
export const addEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { event_type, date, time, location, details, rosterId } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        event_type,
        date,
        time,
        location,
        details,
        roster: {
          connect: {
            id: rosterId,
          },
        },
      },
    });

    res.json(newEvent);
  } catch (error) {
    next(error);
  }
};

// @desc Get all events
// @route GET /events
// @access Private
export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

// @desc Get an event by ID
// @route GET /events/:id
// @access Private
export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(event);
  } catch (error) {
    next(error);
  }
};

// @desc Update an event
// @route PUT /events/:id
// @access Private
export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { event_type, date, time, location, details, rosterId } = req.body;

    const updatedEvent = await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        event_type,
        date,
        time,
        location,
        details,
        roster: {
          connect: {
            id: rosterId,
          },
        },
      },
    });

    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

// @desc Delete an event
// @route DELETE /events/:id
// @access Private
export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedEvent = await prisma.event.delete({
      where: {
        id: Number(id),
      },
    });

    res.json(deletedEvent);
  } catch (error) {
    next(error);
  }
};

// @desc Get an event and its players in the roster
// @route GET /events/:id/players
// @access Private
export const getEventWithPlayers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventId = Number(req.params.id);

    // Retrieve the event and include the associated roster and players
    const eventWithPlayers = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        roster: {
          include: {
            players: true,
          },
        },
      },
    });

    if (!eventWithPlayers) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.json(eventWithPlayers);
  } catch (error) {
    next(error);
  }
};

// @desc Update the availability status of players in an event
// @route PUT /events/:eventId/players/:playerId/availability
// @access Private
export const updatePlayerAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId, playerId } = req.params;
    const { availability_status } = req.body;

    // Check if the event and player exist
    const event = await prisma.event.findUnique({
      where: {
        id: Number(eventId),
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    const player = await prisma.player.findUnique({
      where: {
        id: Number(playerId),
      },
    });

    if (!player) {
      res.status(404).json({ message: 'Player not found' });
      return;
    }

    // Update the availability status of the player in the event's roster
    const updatedPlayer = await prisma.player.update({
      where: {
        id: Number(playerId),
      },
      data: {
        availability_status,
      },
    });

    res.json(updatedPlayer);
  } catch (error) {
    next(error);
  }
};

// @desc Generate an invitation token
// @route GET /events/:eventId/:invitationToken
// @access Public
export const generateInvitationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;

    // Generate a random unique hash using UUID
    const invitationToken: string = uuidv4();

    // Store the invitation token with the event in the database
    await prisma.event.update({
      where: {
        id: Number(eventId),
      },
      data: {
        invitationToken,
      },
    });

    res.json({ invitationToken });
  } catch (error) {
    next(error);
  }
};

// @desc Get an event by invitation token
// @route GET /events/:invitationToken
// @access Public
export const getEventByInvitationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { invitationToken } = req.params;

    const event = await prisma.event.findUnique({
      where: {
        invitationToken,
      },
      include: {
        roster: {
          include: {
            players: true,
          },
        },
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    res.render('event', { event, players: event.roster.players });
  } catch (error) {
    next(error);
  }
};

// @desc Update player availability
// @route PUT /events/:eventId/players/:playerId/availability
// @access Public
export const updatePlayerAvailabilityUsingForm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId, playerId } = req.params;
    const { availability } = req.body;

    // Update player's availability status in the database
    const updatedPlayer = await prisma.player.update({
      where: { id: parseInt(playerId) },
      data: { availability_status: availability },
    });

    res.status(200).json({ message: 'Player availability updated', player: updatedPlayer });
  } catch (error) {
    next(error);
  }
};
