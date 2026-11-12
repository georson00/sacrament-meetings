import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sacrament Meetings | Lynbrook Ward',
  description: 'View sacrament meeting programs for Lynbrook Ward.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased`}
      >
        <Suspense
  fallback={
    <div
      className="h-24 border-b border-gray-200 bg-white"
      aria-hidden="true"
    />
  }
>
  <Header />
</Suspense>

        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
