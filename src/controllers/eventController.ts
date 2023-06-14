import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// @desc Create a new Event
// @route POST /events
// @access Private
export const addEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { event_type, date, time, location, details, teamId } = req.body;

    const newEvent = await prisma.event.create({
      data: {
        event_type,
        date,
        time,
        location,
        details,
        team: {
          connect: {
            id: teamId,
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
    const { event_type, date, time, location, details, teamId } = req.body;

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
        team: {
          connect: {
            id: teamId,
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

// @desc Get an event and its players in the team
// @route GET /events/:id/players
// @access Private
export const getEventWithPlayers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const eventId = Number(req.params.id);

    // Retrieve the event and include the associated team and players
    const eventWithPlayers = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        team: {
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

    // Update the availability status of the player in the event's team
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

// @desc Get an invitation token
// @route GET /events/:eventId/generate-token
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

// @desc Show event invitation form
// @route GET /events/:eventId/:invitationToken
// @access Public
export const showEventInvitation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId, invitationToken } = req.params;

    // Retrieve the event based on the provided event ID and invitation token
    const event = await prisma.event.findFirst({
      where: {
        AND: [
          { id: Number(eventId) },
          { invitationToken },
        ],
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Retrieve the team and its players
    const team = await prisma.team.findUnique({
      where: {
        id: event.teamId,
      },
      include: {
        players: true,
      },
    });

    if (!team) {
      res.status(404).json({ message: 'Team not found' });
      return;
    }

    res.render('invitation', { event, players: team.players });
  } catch (error) {
    next(error);
  }
};

// @desc Update player availability from event invitation
// @route POST /events/:eventId/players/availability
// @access Public
export const updatePlayerAvailabilityFromInvitation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId } = req.params;
    const { playerId, playerName, availability } = req.body;
    console.log(playerId)
    
    // Check if the event exists
    const event = await prisma.event.findUnique({
      where: {
        id: Number(eventId),
      },
    });

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Check if the player exists
    const playerExists = await prisma.player.findUnique({
      where: {
        id: Number(playerId),
      },
    });

    if (!playerExists) {
      res.status(404).json({ message: 'Player not found' });
      return;
    }

    // Update the availability status of the player in the event's team
    await prisma.player.update({
      where: {
        id: Number(playerId),
      },
      data: {
        availability_status: availability,
      },
    });

    res.redirect('/api/events/1/players'); // Redirect to a success page or any other desired page
  } catch (error) {
    next(error);
  }
};
