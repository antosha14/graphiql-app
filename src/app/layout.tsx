import type { Metadata } from 'next';
import '@styles/index.scss';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';

export const metadata: Metadata = {
  title: 'APEX API Explorer',
  description: 'Final task for RSS React course 2024',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
