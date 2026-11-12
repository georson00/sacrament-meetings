
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {formattedDate}
        </h2>

        <p className="mt-1 text-sm capitalize text-gray-500">
          {meeting.meetingType} Sacrament Meeting
        </p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Presiding:</span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold">Conducting:</span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold">Opening Hymn:</span>{' '}
          #{meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>

        <p>
          <span className="font-semibold">Speakers:</span>{' '}
          {meeting.speakers.filter(
            speaker => speaker.type === 'speaker'
          ).length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
      >
        View Meeting Details
      </Link>
    </article>
  );
}
