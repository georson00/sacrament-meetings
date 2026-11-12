
export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} Lynbrook Ward
          </p>

          <p className="text-sm text-gray-500">
            Sacrament Meeting Program
          </p>
        </div>
      </div>
    </footer>
  );
}
