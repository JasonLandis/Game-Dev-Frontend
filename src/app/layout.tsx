import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Game Dev Blog'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 w-full border-b-2 border-black font-medium space-x-4">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>
          <Link href="/games" className="hover:text-sky-400">
            Games
          </Link>
        </nav>
        <div className="m-5">{children}</div>
      </body>
    </html>
  );
}
