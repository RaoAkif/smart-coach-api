import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ message: 'Hello JSON!' });
}

export async function POST(request: Request) {
  return new Response('Hello Post Request', {
    status: 200,
  });
}
