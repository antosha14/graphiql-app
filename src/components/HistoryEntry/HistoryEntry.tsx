'use client';

import styles from './HistoryEntry.module.scss';
import { Query } from '@utils/useLocalStorage';
import { useRouter } from 'next/navigation';

export default function HistoryEntry({ query }: { query: Query }) {
  const router = useRouter();
  const url = `/${query.method == 'graphql' ? 'graphiql' : 'restful'}/${query.method}/${btoa(query.url)}/${btoa(JSON.stringify(query.body))}?${query.headers
    .map(header => {
      return `${header.paramKey}=${header.paramValue}`;
    })
    .join('&')}`;
  return (
    <div className={styles.entryContainer} onClick={() => router.push(url)}>
      <div className={styles.textDescription}>{query.method}</div>
      <div className={styles.textDescription}>{query.url}</div>
      <div className={styles.textDescription}>{`${query.status}. ${query.statusText}`}</div>
    </div>
  );
}
