'use client';

import styles from './RestResponse.module.scss';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useRestRequest, useRequestUpdateContext } from '@contexts/RequestStateContext';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function RestResponse() {
  const request = useRestRequest();
  const setRequest = useRequestUpdateContext();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      if (setRequest) {
        setRequest({
          status: 'noRequest',
          response: { status: 0, statusText: '', duration: 0, contentLength: '0', data: '' },
        });
      }
    };
  }, []);

  const requestSection =
    request.status == 'noRequest' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.httpCodeContainer}>
          <p className={styles.responseStatusParagraph}>{t('initialResp')}</p>
        </div>
      </section>
    ) : request.status == 'pending' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.responseLoadingContainer}>
          <link href="/loader.svg" as="image" />
          <img src="/loader.svg" alt="Loading indicator" className={styles.loadingSvg} />
        </div>
      </section>
    ) : request.status == 'displayError' ? (
      <section className={styles.restResponseContainer}>
        <div className={styles.responseErrorContainer}>{request.response.data}</div>
      </section>
    ) : (
      <section className={styles.restResponseContainer}>
        <div className={styles.httpCodeContainer}>
          <p className={styles.responseStatusParagraph}>
            {t('statCode')} {request.response.status}.
          </p>
          {request.response.statusText !== 'Unknown Status' && (
            <p className={styles.responseStatusParagraph}>
              {t('status')} {request.response.statusText}
            </p>
          )}
          <p className={styles.responseStatusParagraph}>
            {t('time')} {request.response.duration}ms. {t('cLength')} {request.response.contentLength} {t('bytes')}
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
