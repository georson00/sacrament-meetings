
import { connection } from 'next/server';
import NavLinks from './NavLinks';

export default async function Header() {
  await connection();

  const wardName = 'Lynbrook Ward';

  const currentDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {wardName}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {currentDate}
            </p>
          </div>

          <NavLinks />
        </div>
      </div>
    </header>
  );
}
