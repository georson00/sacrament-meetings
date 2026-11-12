
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const meetingTypes = {
    regular: 'Regular Sacrament Meeting',
    testimony: 'Fast and Testimony Meeting',
    stake: 'Stake Meeting',
    general: 'General Conference',
  };

  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">

      {/* Meeting heading */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          {meetingTypes[meeting.meetingType]}
        </h1>

        <p className="mt-2 text-gray-600">
          {formattedDate}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Meeting #{meeting.id}
        </p>
      </header>

      {/* Leadership */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Meeting Leadership
        </h2>

        <div className="space-y-3">
          <p><strong>Presiding:</strong> {meeting.presiding}</p>
          <p><strong>Conducting:</strong> {meeting.conducting}</p>
        </div>
      </section>

      {/* Opening */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Opening
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Opening Hymn:</strong>{' '}
            #{meeting.openingHymn.number} — {meeting.openingHymn.title}
          </p>

          <p>
            <strong>Opening Prayer:</strong> {meeting.openingPrayer}
          </p>
        </div>
      </section>

      {/* Ward and Stake Business */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Ward and Stake Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-2 pl-5">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No ward business.</p>
        )}

        {meeting.stakeBusiness && (
          <p className="mt-4 font-medium">
            Stake Business
          </p>
        )}
      </section>

      {/* Sacrament */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Sacrament
        </h2>

        <p>
          <strong>Sacrament Hymn:</strong>{' '}
          #{meeting.sacramentHymn.number} — {meeting.sacramentHymn.title}
        </p>

        <p className="mt-3 text-sm italic text-gray-500">
          Administration of the Sacrament
        </p>
      </section>

      {/* Speakers and Musical Numbers */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.length > 0 ? (
          <div className="space-y-5">
            {meeting.speakers.map((item, index) => (
              <div key={index}>
                <p className="font-semibold text-gray-900">
                  {item.name}
                </p>

                <p className="text-sm text-gray-600">
                  {item.type === 'musical-number'
                    ? `Musical Number${item.topic ? ` — ${item.topic}` : ''}`
                    : item.topic || 'Topic not assigned'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {meeting.meetingType === 'testimony'
              ? 'Time for members to share their testimonies.'
              : 'No speakers assigned.'}
          </p>
        )}
      </section>

      {/* Closing */}
      <section className="mb-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
          Closing
        </h2>

        <div className="space-y-3">
          <p>
            <strong>Closing Hymn:</strong>{' '}
            #{meeting.closingHymn.number} — {meeting.closingHymn.title}
          </p>

          <p>
            <strong>Closing Prayer:</strong> {meeting.closingPrayer}
          </p>
        </div>
      </section>

      {/* Announcements */}
      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section>
            <h2 className="mb-4 border-b pb-2 text-xl font-semibold">
              Announcements
            </h2>

            <ul className="list-disc space-y-2 pl-5">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}
    </article>
  );
}
