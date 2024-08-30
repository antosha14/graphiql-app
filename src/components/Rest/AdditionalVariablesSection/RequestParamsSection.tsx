'use client';

import ParamsTable from '../ParamsTable/ParamsTable';
import styles from './RequestParamsSection.module.scss';
import { useReducer, useState, MutableRefObject } from 'react';

export interface VariableField {
  paramKey: string;
  paramValue: string;
}

interface RequestParamsState {
  showHeaderVariables: boolean;
  showQueryVariables: boolean;
  headerVariables: VariableField[];
  queryVariables: VariableField[];
  lastShown: 'query' | 'header';
}

function reducer(state: RequestParamsState, action: variablesActions): RequestParamsState {
  switch (action.type) {
    case 'showed_query': {
      if (state.showHeaderVariables) {
        return {
          ...state,
          showQueryVariables: !state.showQueryVariables,
          showHeaderVariables: false,
          lastShown: 'query',
        };
      }
      return { ...state, showQueryVariables: !state.showQueryVariables, lastShown: 'query' };
    }
    case 'showed_headers': {
      if (state.showQueryVariables) {
        return {
          ...state,
          showQueryVariables: false,
          showHeaderVariables: !state.showHeaderVariables,
          lastShown: 'header',
        };
      }
      return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
    }
    case 'toggled_show': {
      if (state.showQueryVariables) {
        return { ...state, showQueryVariables: !state.showQueryVariables, lastShown: 'query' };
      } else if (state.showHeaderVariables) {
        return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
      } else {
        if (state.lastShown == 'query') {
          return { ...state, showQueryVariables: !state.showQueryVariables, lastShown: 'query' };
        } else {
          return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
        }
      }
    }

    case 'added_headers': {
      const newHeadersArray = [...state.headerVariables, { paramKey: '1', paramValue: 'Monkey' }];
      return {
        ...state,
        headerVariables: newHeadersArray,
      };
    }
    case 'removed_headers': {
      return {
        ...state,
      };
    }
    case 'added_query': {
      return {
        ...state,
      };
    }
    case 'removed_query': {
      return {
        ...state,
      };
    }
  }
}

type variablesActions =
  | { type: 'showed_query' }
  | { type: 'showed_headers' }
  | { type: 'toggled_show' }
  | { type: 'added_headers' }
  | { type: 'removed_headers'; index: number }
  | { type: 'added_query'; newQuery: VariableField }
  | { type: 'removed_query'; index: number };

const initialState: RequestParamsState = {
  showHeaderVariables: false,
  showQueryVariables: false,
  headerVariables: [],
  queryVariables: [],
  lastShown: 'query',
};

export default function RequestParamsSection({ parentContainerRef }: { parentContainerRef: MutableRefObject<null> }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [height, setHeight] = useState<number>(40);
  const [startY, setStartY] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (parentContainerRef.current) {
      const heightChange = startY - e.clientY;
      const newHeight = height + heightChange;
      if (newHeight > 50 && newHeight < parentContainerRef.current.clientHeight - 40) {
        setHeight(newHeight);
        setStartY(e.clientY);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setStartY(e.clientY); // Store the initial mouse position
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={styles.paramsContainer} style={{ height: `${height}px` }}>
      <div className={styles.paramsSelectionContainer} onMouseDown={handleMouseDown}>
        <button
          className={`${styles.paramChooseButton} ${state.showQueryVariables ? styles.buttonActive : ''}`}
          onClick={() => {
            dispatch({ type: 'showed_query' });
          }}
        >
          Variables
        </button>
        <button
          className={`${styles.paramChooseButton} ${state.showHeaderVariables ? styles.buttonActive : ''}`}
          onClick={() => {
            dispatch({ type: 'showed_headers' });
          }}
        >
          Headers
        </button>
        <button
          className={styles.paramShowButton}
          onClick={() => {
            dispatch({ type: 'toggled_show' });
          }}
        >
          <svg
            height="1em"
            viewBox="0 0 14 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="graphiql-chevron-icon"
          >
            <title>chevron down icon</title>
            <path d="M1 1L7 7L13 1" stroke="currentColor"></path>
          </svg>
        </button>
      </div>
      {state.showQueryVariables ? (
        <ParamsTable elements={state.queryVariables} dispatcher={dispatch}></ParamsTable>
      ) : state.showHeaderVariables ? (
        <ParamsTable elements={state.headerVariables} dispatcher={dispatch}></ParamsTable>
      ) : (
        ''
      )}
    </div>
  );
}
