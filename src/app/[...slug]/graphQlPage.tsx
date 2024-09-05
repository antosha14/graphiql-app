import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import styles from '@styles/RestfulPage.module.scss';
import RestResponse from '@components/Rest/RestResponse/RestResponse';
import GraphiQlClient from '@components/GraphiQl/GraphiQlClient/GraphiQlClient';

export default function GraphiqlPage() {
  return (
    <ProtectedRoute>
      <section className={styles.graphQlContainer}>
        <GraphiQlClient></GraphiQlClient>
        <RestResponse></RestResponse>
      </section>
    </ProtectedRoute>
  );
}
