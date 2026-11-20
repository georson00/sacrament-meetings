
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requestedPage = Number(searchParams.get('page') ?? '1');
  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Meeting pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Previous
        </Link>
      )}

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
