
import { notFound } from 'next/navigation';

import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meeting-db';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}


export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;

  // Validate the ID before calling the API
  const meetingId = Number(id);

  if (
    !/^\d+$/.test(id) ||
    !Number.isSafeInteger(meetingId) ||
    meetingId <= 0
  ) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
