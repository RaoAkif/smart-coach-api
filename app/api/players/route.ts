import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchPlayers = async () => {
  try {
    const players = await prisma.player.findMany({});
    return players;
  } catch (error: any) {
    throw new Error(error);
  }
};

export async function GET(request: Request) {
  const players = await fetchPlayers();
  return NextResponse.json({ players });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { playerName, playerPosition, playerContactInfo } = body;
  try {
    const createdPlayer = await prisma.player.create({
      data: {
        // @ts-ignore
        name: playerName,
        position: playerPosition,
        contact: playerContactInfo,
      },
    });
    return NextResponse.json(createdPlayer);
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
