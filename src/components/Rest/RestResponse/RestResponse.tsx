'use client';

import styles from './RestResponse.module.scss';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useRestRequest } from '@contexts/RequestStateContext';

export default function RestResponse() {
  const request = useRestRequest();
  const requestSection =
    request.status == 'noRequest' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.httpCodeContainer}>
          <p className={styles.responseStatusParagraph}>App is ready to make a request!</p>
        </div>
      </section>
    ) : request.status == 'pending' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.responseLoadingContainer}>
          <link rel="preload" href="/loader.svg" as="image" />
          <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg}></img>
        </div>
      </section>
    ) : request.status == 'displayError' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.responseErrorContainer}>{request.response.data}</div>
      </section>
    ) : (
      <section className={styles.restResponseContainer}>
        <div className={styles.httpCodeContainer}>
          <p className={styles.responseStatusParagraph}>Response status code: {request.response.status}.</p>
          {request.response.statusText !== 'Unknown Status' && (
            <p className={styles.responseStatusParagraph}>Response status: {request.response.statusText}</p>
          )}
          <p className={styles.responseStatusParagraph}>
            Request time: {request.response.duration}ms. Content length: {request.response.contentLength} bytes.
          </p>
        </div>
        <div className={styles.syntaxHighlighterWrapper}>
          <CodeMirror
            value={request.response.data}
            extensions={[json(), EditorView.lineWrapping]}
            theme={ApexTheme}
            className={styles.codeMirror}
            readOnly={true}
            basicSetup={{
              lineNumbers: false,
            }}
            height="450px"
          />
        </div>
      </section>
    );
  return requestSection;
}
