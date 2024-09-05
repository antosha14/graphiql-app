'use client';

import styles from './HistorySection.module.scss';
import { getAllQueries } from '@utils/useLocalStorage';
import HistoryEntry from '@components/HistoryEntry/HistoryEntry';
import Link from 'next/link';
import { Query } from '@utils/useLocalStorage';

export default function HistorySection() {
  const queries = getAllQueries();
  return (
    <section className={styles.historyContainer}>
      {queries.length == 0 ? (
        <div className={styles.message}>You haven't executed any requests It's empty here. Try: </div>
      ) : (
        <div className={styles.historyEntriesContainer}>
          <div className={styles.tableHeaderContainer}>
            <div>Method</div>
            <div>URL</div>
            <div>Query status</div>
          </div>
          {queries.map((query: Query, index: number) => (
            <HistoryEntry key={index} query={query}></HistoryEntry>
          ))}
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <Link href="/GET" className={styles.buttonLarge}>
          REST Client
        </Link>
        <Link href="/GRAPHQL" className={styles.buttonLarge}>
          GraphiQL Client
        </Link>
      </div>
    </section>
  );
}
