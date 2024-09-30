'use client';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import TranslationsProvider from '@components/TranslationsProvider/TranslationsProvider';
import type { ReactNode } from 'react';

export default function Layout({ children, locale }: { children: ReactNode; locale: string }) {
  const namespaces = ['home', 'forms', 'clients', 'history'];

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces}>
      <Header />
      <main>{children}</main>
      <Footer />
    </TranslationsProvider>
  );
}
