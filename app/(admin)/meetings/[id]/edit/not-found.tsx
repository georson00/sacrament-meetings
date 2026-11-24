
import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <section className="mx-auto max-w-xl py-10 text-center">
      <h1 className="mb-3 text-2xl font-bold text-gray-900">
        Meeting not found
      </h1>

      <p className="mb-6 text-gray-600">
        The meeting you&apos;re trying to edit doesn&apos;t exist or may have
        been deleted.
      </p>

      <Link
        href="/meetings"
        className="inline-block rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
      >
        Back to Meetings
      </Link>
    </section>
  );
}
