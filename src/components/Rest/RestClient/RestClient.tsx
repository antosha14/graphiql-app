import styles from './RestClient.module.scss';
import RequestBar from '../RequestBar/RequestBar';
import RequestParamsSection from '../AdditionalVariablesSection/RequestParamsSection';

export default function RestClient() {
  return (
    <section className={styles.restClientContainer}>
      <RequestBar></RequestBar>
      <RequestParamsSection></RequestParamsSection>
    </section>
  );
}
