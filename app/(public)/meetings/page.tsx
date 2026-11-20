
import MeetingCard from '@/components/MeetingCard';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meeting-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';



export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;

}) {
  const params = await searchParams;

  const query = params.query ?? '';
  const requestedPage = Number(params.page ?? '1');
  const currentPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);


  return (
    
    <section aria-labelledby="meetings-heading">
      <MeetingSearch />
      <h2
        id="meetings-heading"
        className="mb-6 text-xl font-semibold text-gray-900"
      >
        
        All Meetings
      </h2>

      {meetings.length === 0 ? (
        <p className="text-gray-600">
          No sacrament meetings are available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
          <Pagination totalPages = {totalPages} />
        </div>
        
      )}
    </section>
  );
}
