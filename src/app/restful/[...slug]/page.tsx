'use client';

import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import styles from '@styles/RestfulPage.module.scss';
import RestClient from '@components/Rest/RestClient/RestClient';
import RestResponse from '@components/Rest/RestResponse/RestResponse';

export default function RestfullPage() {
  return (
    <ProtectedRoute>
      <section className={styles.restfulContainer}>
        <RestClient></RestClient>
        <RestResponse></RestResponse>
      </section>
    </ProtectedRoute>
  );
}
