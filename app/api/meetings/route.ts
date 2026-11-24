
import { NextRequest, NextResponse } from 'next/server';
import {
  getMeetings,
  getMeetingsByDate,
} from '@/lib/meetings-db';
import { connection } from 'next/server';



export async function GET(request: NextRequest) {
  await connection();
  try {
    // Read the request URL at runtime.
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (date !== null) {
      // Require YYYY-MM-DD format.
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
          { message: 'Invalid date. Use YYYY-MM-DD format.' },
          { status: 400 }
        );
      }

      // Reject impossible calendar dates.
      const parseDate = new Date(`${date}T00:00:00Z`);

      if (
        Number.isNaN(parseDate.getTime()) ||
        parseDate.toISOString().slice(0, 10) !== date
      ) {
        return NextResponse.json(
          { message: 'Invalid calendar date.' },
          { status: 400 }
        );
      }

      const meetings = await getMeetingsByDate(date);

      return NextResponse.json(meetings);
    }

    const meetings = await getMeetings();

    return NextResponse.json(meetings);
  } catch (error) {
    console.error('Failed to retrieve meetings:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
