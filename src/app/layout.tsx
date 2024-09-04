import type { Metadata } from 'next';
import '@styles/index.scss';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import { AuthProvider } from '@contexts/AuthContext';
import RestProvider from '@contexts/RequestStateContext';

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
          <RestProvider>
            <>
              <Header />
              <main>{children}</main>
              <Footer />
            </>
          </RestProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
