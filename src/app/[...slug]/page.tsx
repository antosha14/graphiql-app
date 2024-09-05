'use client';

import { usePathname } from 'next/navigation';
import GraphiqlPage from './graphQlPage';
import RestfullPage from './restfulPage';

export default function RouteHandling() {
  const pathname = usePathname();
  const urlParts = pathname.split('/').slice(1);
  return urlParts[0]?.toLowerCase() == 'graphql' ? <GraphiqlPage /> : <RestfullPage />;
}
