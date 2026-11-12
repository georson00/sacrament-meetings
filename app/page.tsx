
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Welcome to Lynbrook Ward
          </h1>

          <p className="text-lg leading-relaxed text-gray-600">
            Explore upcoming and previous sacrament meeting
            programs, including hymns, prayers, speakers,
            and announcements.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/meetings/current"
              className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-hover"
            >
              Current Meeting
            </Link>

            <Link
              href="/meetings"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              View All Meetings
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/images/sacrament-meeting.jpg"
            alt="Interior of a chapel with seating and a pulpit"
            width={1200}
            height={800}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      <section className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Sacrament Meeting Programs
        </h2>

        <p className="max-w-3xl leading-relaxed text-gray-600">
          Find meeting agendas, review assigned speakers and
          musical numbers, and stay informed about ward
          announcements.
        </p>
      </section>
    </main>
  );
}
