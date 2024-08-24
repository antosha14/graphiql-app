import type { Metadata } from 'next';
import '@styles/index.scss';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { AuthProvider } from '@contexts/AuthContext';

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
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
