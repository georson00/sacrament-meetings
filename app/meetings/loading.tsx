
export default function Loading() {
  return (
    <div
      className="flex min-h-[300px] flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-700"
        aria-hidden="true"
      />

      <p className="text-sm font-medium text-gray-600">
        Loading sacrament meetings...
      </p>
    </div>
  );
}
