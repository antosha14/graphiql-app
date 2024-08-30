'use client';

import styles from './RestClient.module.scss';
import RequestBar from '../RequestBar/RequestBar';
import RequestParamsSection from '../AdditionalVariablesSection/RequestParamsSection';
import { useRef, RefObject } from 'react';

export default function RestClient() {
  const containerRef = useRef<RefObject<HTMLElement>>(null);
  return (
    <section className={styles.restClientContainer} ref={containerRef}>
      <RequestBar></RequestBar>
      <RequestParamsSection parentContainerRef={containerRef}></RequestParamsSection>
    </section>
  );
}
