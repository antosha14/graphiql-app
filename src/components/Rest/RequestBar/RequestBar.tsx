'use client';

import styles from './RequestBar.module.scss';
import { useState, useRef, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { parseRequestBody } from '@utils/parseRequestBody';

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

export default function RequestBar() {
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
    router.push(`/restful/${method}/${encodedUrl}/${encodedBody}?${params.join('&')}`);
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
    const value = e.target.value;
    setUrl(value);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        updateUrl(requestMethod, value, requestBody);
      }, 1000)
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
          <button className={styles['send-button']}>Send</button>
        </div>
      </div>
      <div className={styles.requestBodyContainer}>
        <div className={styles.bodyLabel}>
          <div>Body:</div>
        </div>
        <div className={styles.bodyEditorContainer}>
          <CodeMirror
            value={requestBody}
            extensions={[json()]}
            theme={ApexTheme}
            className={styles.codeMirror}
            height="200px"
            ref={editorRef}
            onChange={value => handleBodyChange(value)}
            onBlur={handleBodyBlur}
          />
        </div>
        <div className={styles.buttonsContainer}>
          <img src="/brush.svg" className={styles.bodyHelperButton} onClick={handlePrettifyClick}></img>
          <img src="/copy.svg" className={styles.bodyHelperButton} onClick={handleCopyClick}></img>
        </div>
      </div>
    </div>
  );
}
