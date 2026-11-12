
import { headers } from 'next/headers';
import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';

async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const headersList = await headers();
  const host = headersList.get('host');

  if (!host) {
    throw new Error('Unable to determine application host');
  }

  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const response = await fetch(
    `${protocol}://${host}/api/meetings`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meetings');
  }

  return response.json();
}

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();

  return (
    <section aria-labelledby="meetings-heading">
      <h2
        id="meetings-heading"
        className="mb-6 text-xl font-semibold text-gray-900"
      >
        All Meetings
      </h2>

      {meetings.length === 0 ? (
        <p className="text-gray-600">
          No sacrament meetings are available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      )}
    </section>
  );
}
