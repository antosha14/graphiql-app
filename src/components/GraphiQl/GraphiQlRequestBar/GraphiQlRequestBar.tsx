'use client';

import styles from './GraphiQlRequestBar.module.scss';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { parseRequestBody } from '@utils/parseRequestBody';
import IconWithDescription from '@components/Rest/IconWithDescription/IconWithDescription';
import { useRequestUpdateContext } from '@contexts/RequestStateContext';
import { parseQueryparams } from '@components/Rest/AdditionalVariablesSection/RequestParamsSection';
import { addQueryToLs } from '@utils/useLocalStorage';
import { DocumentationSearchBar } from '../DocumentationSearchBar/DocumentationSearchBar';
import GqlCodeMirror from '../GqlCodeMirror/GqlCodeMirror';
import { parse, print } from 'graphql';

const initialGqlText = `## Here is GQL editor`;

export default function RequestBar({ height }: { height: number }) {
  const pathname = usePathname();
  const urlParts = pathname.split('/').slice(1);
  const [method, encodedUrl = '', encodedBody = ''] = urlParts;
  const [requestMethod] = useState<string>(method || 'GET');

  const [requestBody, setRequestBody] = useState<string>(encodedBody ? atob(encodedBody) : initialGqlText);
  const [url, setUrl] = useState<string>(encodedUrl ? atob(encodedUrl) : 'noUrl');
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const searchParams = useSearchParams();
  const setRequestState = useRequestUpdateContext();
  const [prettifyIndicator, setPrettifyIndicator] = useState(1);

  useEffect(() => {
    if (urlInputRef.current && url !== 'noUrl') {
      urlInputRef.current.focus();
    }
  }, [url]);

  const updateUrl = (urlValue: string, bodyValue: string) => {
    const encodedUrl = btoa(urlValue);
    const encodedBody = btoa(bodyValue);
    const params: string[] = [];
    searchParams.forEach((value, key) => {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    });
    window.history.replaceState({}, '', `/GRAPHQL/${encodedUrl}/${encodedBody}?${params.join('&')}`);
  };

  const handlePrettifyClick = async () => {
    setPrettifyIndicator(Math.random());
    try {
      const parsedQuery = parse(requestBody);
      const formattedQuery = print(parsedQuery);
      setRequestBody(formattedQuery);
    } catch {
      setRequestBody("Your input wasn't a valid query");
    }
  };

  const handleBodyBlur = (gqlQuery: string, currentUrl: string) => {
    try {
      const [baseUrl, queryString] = currentUrl.split('?');
      const segments = baseUrl.split('/');
      if (segments.length !== 4) {
        let lastSegment = segments.pop() || '';

        lastSegment = btoa(gqlQuery);
        segments.push(lastSegment);
        const updatedUrl = `${segments.join('/')}?${queryString ? queryString : ''}`;
        window.history.replaceState({}, '', updatedUrl);
      } else {
        window.history.replaceState(
          {},
          '',
          `${baseUrl}/${btoa('noUrl')}/${btoa(gqlQuery)}?${queryString ? queryString : ''}`
        );
      }
    } catch {
      setRequestBody("Your input wasn't a valid query");
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
        updateUrl(value, requestBody);
      }, 300)
    );
  };

  const handleBodyChange = (value: string) => {
    setRequestBody(value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(requestBody);
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
      body: JSON.stringify({ query: parseRequestBody(requestBody) }),
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
        } else {
          if (setRequestState) {
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
        }
        return;
      } else {
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
        <div className={styles['url-input']}>
          <input
            ref={urlInputRef}
            type="text"
            className={styles.urlInputField}
            placeholder="Enter GraphQL Endpoint URL"
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
        <GqlCodeMirror
          queryBody={requestBody}
          onBodyChange={handleBodyChange}
          onBodyBlur={handleBodyBlur}
          wasPrettified={prettifyIndicator}
        />
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
      <DocumentationSearchBar currentUrl={url}></DocumentationSearchBar>
    </div>
  );
}
