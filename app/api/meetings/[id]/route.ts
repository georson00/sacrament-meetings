
import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meeting-db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const meetingId = Number(id);

  // Validate the meeting ID
  if (
    !/^\d+$/.test(id) ||
    !Number.isSafeInteger(meetingId) ||
    meetingId <= 0
  ) {
    return NextResponse.json(
      { message: 'Invalid meeting ID. ID must be a positive integer.' },
      { status: 400 }
    );
  }

  // Find the meeting
  const meeting = getMeetingById(meetingId);

  if (!meeting) {
    return NextResponse.json(
      { message: 'Meeting not found.' },
      { status: 404 }
    );
  }

  // Return the meeting
  return NextResponse.json(meeting, { status: 200 });
}
