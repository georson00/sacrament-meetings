
import Link from 'next/link';
import type { ReactNode } from 'react';

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({
  children,
}: MeetingsLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-8 border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Sacrament Meeting Programs
        </h2>

        <p className="mt-2 text-gray-600">
          Browse meeting programs and view the current
          sacrament meeting agenda.
        </p>

        <nav
          aria-label="Meeting section navigation"
          className="mt-5 flex flex-wrap gap-3"
        >
          <Link
            href="/meetings"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
          >
            All Meetings
          </Link>

          <Link
            href="/meetings/current"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Current Meeting
          </Link>
        </nav>
      </div>

      {children}
    </main>
  );
}
