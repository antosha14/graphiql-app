import styles from './RestClient.module.scss';
import RequestBar from '../Request Bar/RequestBar';

export default function RestClient() {
  return (
    <section className={styles.restClientContainer}>
      <RequestBar></RequestBar>
    </section>
  );
}
