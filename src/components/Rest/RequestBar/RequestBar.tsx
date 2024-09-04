'use client';

import styles from './RequestBar.module.scss';
import { useState, useRef, useEffect } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { parseRequestBody } from '@utils/parseRequestBody';
import IconWithDescription from '../IconWithDescription/IconWithDescription';
import { useRequestUpdateContext } from '@contexts/RequestStateContext';
import { parseQueryparams } from '../AdditionalVariablesSection/RequestParamsSection';
import { addQueryToLs } from '@utils/useLocalStorage';

const requestTypeOptions = [
  { method: 'GET', color: '#90EE90' },
  { method: 'POST', color: '#FBBF00' },
  { method: 'PUT', color: '#00A1E0' },
  { method: 'DELETE', color: '#D9534F' },
  { method: 'PATCH', color: '#FFB74D' },
  { method: 'OPTIONS', color: '#9E9E9E' },
  { method: 'HEAD', color: '#673AB7' },
  { method: 'CONNECT', color: '#FF4081' },
  { method: 'TRACE', color: '#3F51B5' },
];
const initialBodyText = '{\n  "message": "Write request body here"\n}';

export default function RequestBar({ height }: { height: number }) {
  const pathname = usePathname();
  const urlParts = pathname.split('/').slice(2);
  const [method, encodedUrl = '', encodedBody = ''] = urlParts;

  const [requestMethod, setRequestMethod] = useState<string>(method || 'GET');
  const [requestBody, setRequestBody] = useState<string>(encodedBody ? atob(encodedBody) : initialBodyText);
  const [url, setUrl] = useState<string>(encodedUrl ? atob(encodedUrl) : 'noUrl');
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const editorRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setRequestState = useRequestUpdateContext();

  useEffect(() => {
    if (urlInputRef.current && url !== 'noUrl') {
      urlInputRef.current.focus();
    }
  }, [url]);

  const updateUrl = (method: string, urlValue: string, bodyValue: string) => {
    const encodedUrl = btoa(urlValue);
    const encodedBody = btoa(bodyValue);
    const params: string[] = [];
    searchParams.forEach((value, key) => {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    router.push(`/restful/${method}/${encodedUrl}/${encodedBody}?${params.join('&')}`, { scroll: false });
  };

  const handlePrettifyClick = () => {
    if (editorRef.current) {
      try {
        const jsonObject = JSON.parse(requestBody);
        const prettyJson = JSON.stringify(jsonObject, null, 2);
        setRequestBody(prettyJson);
      } catch {
        setRequestBody("Your input wasn't a valid JSON");
      }
    }
  };

  const handleBodyBlur = () => {
    try {
      parseRequestBody(requestBody);
      updateUrl(requestMethod, url, requestBody);
    } catch {
      setRequestBody("Your input wasn't a valid JSON");
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
    const requestParams = {
      url: url !== 'noUrl' ? url : '',
      method: requestMethod,
      body: requestBody,
      headers: parseQueryparams(searchParams),
    };
    try {
      const response = await fetch('/api/makeRestRequest', {
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
              statusText: 'An unexpected error occurred. Please try again later',
              data: 'An unexpected error occurred. Please try again later',
            },
          });
          addQueryToLs({
            ...requestParams,
            status: response.status,
            statusText: 'An unexpected error occurred. Please try again later',
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
            placeholder="Enter URL or paste text"
            value={url !== 'noUrl' ? url : ''}
            onChange={handleUrlChange}
          />
        </div>
        <div className={styles.sendButtonContainer}>
          <button className={styles['send-button']} onClick={handleSendClick}>
            Send
          </button>
        </div>
      </div>
      <div className={styles.requestBodyContainer} style={{ height: `${height + 10}px` }}>
        <div className={styles.bodyLabel}>
          <div>Body:</div>
        </div>
        <div className={styles.bodyEditorContainer}>
          <CodeMirror
            value={requestBody}
            extensions={[json(), EditorView.lineWrapping]}
            theme={ApexTheme}
            className={styles.codeMirror}
            height={`${height}px`}
            ref={editorRef}
            onChange={value => handleBodyChange(value)}
            onBlur={handleBodyBlur}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <IconWithDescription
            imageUrl="/brush.svg"
            handleClickFunction={handlePrettifyClick}
            description="Prettify"
          ></IconWithDescription>
          <IconWithDescription
            imageUrl="/copy.svg"
            handleClickFunction={handleCopyClick}
            description="Copy"
          ></IconWithDescription>
        </div>
      </div>
    </div>
  );
}
