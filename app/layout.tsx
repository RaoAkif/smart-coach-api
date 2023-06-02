import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="max-w-[1000px] mx-auto p-4">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
