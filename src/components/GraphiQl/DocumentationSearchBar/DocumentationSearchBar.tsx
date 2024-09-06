'use client';

import styles from './DocumentationSearchBar.module.scss';
import { useState } from 'react';
import DocumentationPopup from '../DocumentationPopup/DocumentationPopup';

export interface DocsState {
  status: 'notFetched' | 'pending' | 'error' | 'visible' | 'fetchedNonVisible';
  data?: SchemaData;
}

const introspectionQuery = `
    {
      __schema {
        types {
          name
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    }`;

interface SchemaType {
  name: string;
  fields:
    | {
        name: string;
        type: {
          name: string | null;
          kind: string;
        };
      }[]
    | null;
}

export interface SchemaData {
  data: {
    __schema: {
      types: SchemaType[];
    };
  };
}

export const DocumentationSearchBar = ({ currentUrl }: { currentUrl: string }) => {
  const [docsState, setDocsState] = useState<DocsState>({ status: 'notFetched' });
  const [ownsInput, setOwnsInput] = useState<boolean>(false);
  const [docsUrl, setDocsUrl] = useState<string>('');

  const handleViewDocsClick = () => {
    setDocsState(state => {
      return { ...state, status: state.status == 'visible' ? 'fetchedNonVisible' : 'visible' };
    });
  };

  const handleGetDocsClick = async () => {
    setDocsState({ status: 'pending' });
    const requestParams = {
      url: ownsInput ? `${docsUrl}?sdl` : currentUrl !== 'noUrl' ? `${currentUrl}?sdl` : '',
      method: 'GRAPHQL',
      body: JSON.stringify({ query: introspectionQuery }),
      headers: [
        {
          id: 0,
          paramKey: 'Content-type',
          paramValue: 'application/json',
        },
      ],
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
      if (response.ok) {
        setDocsState({
          status: 'fetchedNonVisible',
          data: responseData.data,
        });
      } else {
        setDocsState({
          status: 'error',
        });
      }
    } catch {
      setDocsState({
        status: 'error',
      });
    }
  };

  const handleDocsUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!ownsInput) {
      setOwnsInput(true);
    }
    setDocsUrl(e.target.value);
  };

  return (
    <>
      <div className={styles['docs-query-container']}>
        <input
          type="text"
          className={styles.docsUrlInputField}
          placeholder="Enter SDL URL"
          value={ownsInput ? docsUrl : currentUrl !== 'noUrl' ? `${currentUrl}?sdl` : ''}
          onChange={event => handleDocsUrlChange(event)}
        />
        <button className={styles['getDocsButton']} onClick={handleGetDocsClick}>
          Get Docs
        </button>
        <button
          className={`${styles['showDocsButton']} ${docsState.status == 'visible' || docsState.status == 'fetchedNonVisible' ? '' : styles.inactiveButton}`}
          onClick={handleViewDocsClick}
          disabled={docsState.status == 'visible' || docsState.status == 'fetchedNonVisible' ? false : true}
        >
          {docsState.status == 'pending'
            ? 'Fetching...'
            : docsState.status == 'error'
              ? 'Error fetching docs'
              : docsState.status == 'notFetched'
                ? 'No fetched docs'
                : 'View Docs'}
        </button>
        <div className={styles.sendButtonContainer}></div>
      </div>
      <section className={styles.docsContainer}>
        {docsState.data && (
          <DocumentationPopup
            data={docsState.data}
            show={docsState.status == 'visible' ? true : false}
            handleModalClick={setDocsState}
          ></DocumentationPopup>
        )}
      </section>
    </>
  );
};
