
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function MeetingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <section
      role="alert"
      className="mx-auto max-w-xl rounded-lg border border-red-200 bg-white p-6"
    >
      <h1 className="mb-3 text-2xl font-bold text-gray-900">
        Something went wrong
      </h1>

      <p className="mb-5 text-gray-700">
        We couldn&apos;t complete your request. Please try again.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-gray-400 px-4 py-2 font-medium text-gray-900 hover:bg-gray-100"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}
