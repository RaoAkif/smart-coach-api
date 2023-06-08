import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

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