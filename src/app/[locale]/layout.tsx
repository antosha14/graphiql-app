import type { Metadata } from 'next';
import '@styles/index.scss';
import { AuthProvider } from '@contexts/AuthContext';
import RestProvider from '@contexts/RequestStateContext';
import Layout from '@components/Layout/Layout';

export const metadata: Metadata = {
  title: 'APEX API Explorer',
  description: 'Final task for RSS React course 2024',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RestProvider>
            <Layout locale={locale}>{children}</Layout>
          </RestProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
