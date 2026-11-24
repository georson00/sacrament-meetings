
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getMeetingById } from '@/lib/meetings-db';
import EditMeetingForm from '@/components/EditMeetingForm';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

async function EditMeetingContent({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isSafeInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <section aria-labelledby="edit-meeting-heading">
      <h1
        id="edit-meeting-heading"
        className="mb-6 text-2xl font-bold text-gray-900"
      >
        Edit Meeting
      </h1>

      <EditMeetingForm meeting={meeting} />
    </section>
  );
}

export default function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  return (
    <Suspense
      fallback={
        <p role="status" className="text-gray-600">
          Loading meeting...
        </p>
      }
    >
      <EditMeetingContent params={params} />
    </Suspense>
  );
}
