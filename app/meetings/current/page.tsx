
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { getMeetings } from '@/lib/meeting-db';

export default async function CurrentMeetingPage() {
  // Ensure the date is calculated at request time
  await connection();

  // Get today's date in the ward's timezone
  const todayString = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  // Create a UTC date from the calendar date
  const today = new Date(`${todayString}T00:00:00Z`);

  // Find the most recent Sunday
  const dayOfWeek = today.getUTCDay();
  today.setUTCDate(today.getUTCDate() - dayOfWeek);

  // Format as YYYY-MM-DD
  const sundayDate = today.toISOString().slice(0, 10);

  // Find the meeting for that Sunday
  const meetings = getMeetings(sundayDate);
  const meeting = meetings[0];

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  }

  // No meeting found for the current Sunday
  redirect('/meetings');
}
