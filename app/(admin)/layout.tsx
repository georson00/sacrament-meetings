
import type { ReactNode } from 'react';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
