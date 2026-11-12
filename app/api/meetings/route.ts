
import { NextRequest, NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meeting-db';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');

  const meetings = getMeetings(date);

  return NextResponse.json(meetings);
}
