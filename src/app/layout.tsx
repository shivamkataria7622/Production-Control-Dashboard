import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Production Control Dashboard | Factory Operations',
  description: 'Real-time factory management dashboard for monitoring work orders, machine status, and operational bottlenecks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#faf8f5] text-stone-800 antialiased selection:bg-stone-300 selection:text-stone-900">
        {children}
      </body>
    </html>
  );
}
