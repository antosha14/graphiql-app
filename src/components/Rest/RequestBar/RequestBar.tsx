'use client';

import styles from './RequestBar.module.scss';
import { useState, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { ApexTheme } from '@models/codeMirrorTheme';
import { useRouter } from 'next/navigation';

const requestTypeOptions = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];
const initialBodyText = '{\n  "message": "Write request body here"\n}';

export default function RequestBar() {
  const [code, setCode] = useState<string>(initialBodyText);
  const editorRef = useRef(null);
  const router = useRouter();

  const handlePrettifyClick = () => {
    if (editorRef.current) {
      try {
        const jsonObject = JSON.parse(code);
        const prettyJson = JSON.stringify(jsonObject, null, 2);
        setCode(prettyJson);
      } catch {
        setCode('Invalid JSON input');
      }
    }
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/restful/${e.target.value}`);
  };

  const handleBodyChange = (value: string) => {
    setCode(value);
  };

  const handleCopyClick = () => {
    if (editorRef.current) {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className={styles['query-section']}>
      <div className={styles['query-bar-container']}>
        <div className={styles['method-select']}>
          <select name="method" className={styles.methodSelector} onChange={handleMethodChange}>
            {requestTypeOptions.map(method => {
              return (
                <option key={method} value={method} className={styles.methodOption}>
                  {method}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles['url-input']}>
          <input type="text" className={styles.urlInputField} placeholder="Enter URL or paste text" />
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
            value={code}
            extensions={[json()]}
            theme={ApexTheme}
            className={styles.codeMirror}
            height="200px"
            ref={editorRef}
            onChange={value => handleBodyChange(value)}
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
