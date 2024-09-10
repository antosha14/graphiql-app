'use client';

import { usePathname } from 'next/navigation';
import GraphiqlPage from './graphQlPage';
import RestfullPage from './restfulPage';

export default function RouteHandling() {
  const pathname = usePathname();
  const routeClient = pathname.split('/').slice(1)[1];
  return routeClient?.toLowerCase() == 'graphql' ? <GraphiqlPage /> : <RestfullPage />;
}
