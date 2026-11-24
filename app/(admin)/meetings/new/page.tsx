
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <section aria-labelledby="new-meeting-heading">
      <h1
        id="new-meeting-heading"
        className="mb-6 text-2xl font-bold text-gray-900"
      >
        Create Meeting
      </h1>

      <MeetingForm />
    </section>
  );
}
