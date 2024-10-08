'use client';

import styles from './RequestBar.module.scss';
import { useState, useRef, useEffect } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useSearchParams, useParams } from 'next/navigation';
import { parseRequestBody } from '@utils/parseRequestBody';
import IconWithDescription from '../IconWithDescription/IconWithDescription';
import { useRequestUpdateContext } from '@contexts/RequestStateContext';
import { parseQueryparams } from '../AdditionalVariablesSection/RequestParamsSection';
import { addQueryToLs } from '@utils/useLocalStorage';
import { requestTypeOptions } from '@models/requestTypeOptions';
import { useTranslation } from 'react-i18next';
import { b64EncodeUnicode, b64DecodeUnicode } from '@utils/base64encode';

export default function RequestBar({ height }: { height: number }) {
  const { t } = useTranslation();
  const params = useParams();
  const pathname = params.slug;
  const locale = params.locale;
  const method = pathname[0];
  const encodedUrl = pathname[1] || b64EncodeUnicode('noUrl');
  const encodedBody = pathname[2] || b64EncodeUnicode(t('restGreeting'));

  const [requestMethod, setRequestMethod] = useState<string>(method || 'GET');
  const [requestBody, setRequestBody] = useState<string>(b64DecodeUnicode(encodedBody));
  const [url, setUrl] = useState<string>(b64DecodeUnicode(encodedUrl));
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const editorRef = useRef(null);
  const searchParams = useSearchParams();
  const setRequestState = useRequestUpdateContext();

  const [isJson, setIsJson] = useState(true);

  useEffect(() => {
    if (urlInputRef.current && url !== 'noUrl') {
      urlInputRef.current.focus();
    }
  }, [url]);

  const updateUrl = (method: string, urlValue: string, bodyValue: string) => {
    const encodedUrl = b64EncodeUnicode(urlValue);
    const encodedBody = b64EncodeUnicode(bodyValue);
    const params: string[] = [];
    searchParams.forEach((value, key) => {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    window.history.replaceState({}, '', `/${locale}/${method}/${encodedUrl}/${encodedBody}?${params.join('&')}`);
  };

  const handlePrettifyClick = () => {
    if (editorRef.current) {
      try {
        const jsonObject = JSON.parse(requestBody);
        const prettyJson = JSON.stringify(jsonObject, null, 2);
        setRequestBody(prettyJson);
      } catch {
        setRequestBody(`${t('errJson')}`);
      }
    }
  };

  const handleBodyBlur = () => {
    try {
      const parsedBody = parseRequestBody(requestBody);
      updateUrl(requestMethod, url, parsedBody);
    } catch {
      setRequestBody(`${t('errJson')}`);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value !== '' ? e.target.value : 'noUrl';
    setUrl(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        updateUrl(requestMethod, value, requestBody);
      }, 300)
    );
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRequestMethod(e.target.value);
    updateUrl(e.target.value, url, requestBody);
  };

  const handleBodyChange = (value: string) => {
    setRequestBody(value);
  };

  const handleCopyClick = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(requestBody);
    }
  };

  const handleSendClick = async () => {
    if (setRequestState) {
      setRequestState(state => {
        return { ...state, status: 'pending' };
      });
    }

    const parsedBody = parseRequestBody(requestBody);
    const requestParams = {
      url: url,
      method: requestMethod,
      body: parsedBody,
      headers: parseQueryparams(searchParams),
    };
    try {
      const response = await fetch('/api/makeRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestParams),
      });
      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error && setRequestState) {
          setRequestState({
            status: 'displayError',
            response: {
              status: response.status,
              statusText: responseData.error,
              data: responseData.error,
            },
          });
          addQueryToLs({
            ...requestParams,
            status: response.status,
            statusText: responseData.error,
          });
        } else if (setRequestState) {
          setRequestState({
            status: 'displayError',
            response: {
              status: response.status,
              statusText: `${t('reqError')}`,
              data: `${t('reqError')}`,
            },
          });
          addQueryToLs({
            ...requestParams,
            status: response.status,
            statusText: `${t('reqError')}`,
          });
        }
        return;
      }

      if (setRequestState) {
        setRequestState({
          status: 'displayed',
          response: {
            status: responseData.status,
            statusText: responseData.statusText,
            duration: responseData.duration,
            contentLength: responseData.contentLength,
            data: JSON.stringify(responseData.data, null, 2),
          },
        });
        addQueryToLs({
          ...requestParams,
          status: responseData.status,
          statusText: responseData.statusText,
        });
      }
    } catch (error) {
      if (setRequestState) {
        setRequestState({
          status: 'displayError',
          response: {
            status: 0,
            statusText: `${error}`,
            data: `${error}`,
          },
        });
      }
    }
  };

  return (
    <div className={styles['query-section']}>
      <div className={styles['query-bar-container']}>
        <div className={styles['method-select']}>
          <select
            name="method"
            className={styles.methodSelector}
            style={{ color: `${requestTypeOptions.find(option => option.method === requestMethod)?.color}` }}
            onChange={handleMethodChange}
            value={requestMethod}
          >
            {requestTypeOptions.map(value => {
              return (
                <option
                  key={value.method}
                  value={value.method}
                  style={{ color: `${value.color}` }}
                  className={styles.methodOption}
                >
                  {value.method}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles['url-input']}>
          <input
            ref={urlInputRef}
            type="text"
            className={styles.urlInputField}
            placeholder={t('urlPlaceholder')}
            value={url !== 'noUrl' ? url : ''}
            onChange={handleUrlChange}
          />
        </div>
        <div className={styles.sendButtonContainer}>
          <button className={styles['send-button']} onClick={handleSendClick}>
            {t('send')}
          </button>
        </div>
      </div>
      <div className={styles.requestBodyContainer} style={{ height: `${height + 10}px` }}>
        <div className={styles.bodyLabel}>
          <div className={styles.label}>{t('body')}</div>
          <button className={`${styles.editorOption} ${isJson && styles.active}`} onClick={() => setIsJson(true)}>
            Json
          </button>
          <button className={`${styles.editorOption} ${!isJson && styles.active}`} onClick={() => setIsJson(false)}>
            {t('raw')}
          </button>
        </div>
        <div className={styles.bodyEditorContainer}>
          <CodeMirror
            value={requestBody}
            extensions={[isJson ? json() : [], EditorView.lineWrapping]}
            theme={ApexTheme}
            className={styles.codeMirror}
            height={`${height}px`}
            ref={editorRef}
            onChange={value => handleBodyChange(value)}
            onBlur={handleBodyBlur}
          />
        </div>
        <div className={styles.buttonsContainer}>
          {isJson && (
            <IconWithDescription
              imageUrl="/brush.svg"
              handleClickFunction={handlePrettifyClick}
              description={`${t('prettify')}`}
            ></IconWithDescription>
          )}
          <IconWithDescription
            imageUrl="/copy.svg"
            handleClickFunction={handleCopyClick}
            description={`${t('copy')}`}
          ></IconWithDescription>
        </div>
      </div>
    </div>
  );
}
