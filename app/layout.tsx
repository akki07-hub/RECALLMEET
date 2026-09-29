import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RecallMeet — Meeting Intelligence',
  description: 'Your meetings shouldn\'t forget what you decided.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`} suppressHydrationWarning>
        <Sidebar />
        <main className="ml-64 min-h-screen" suppressHydrationWarning>
          <div className="p-8 max-w-6xl mx-auto" suppressHydrationWarning>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
