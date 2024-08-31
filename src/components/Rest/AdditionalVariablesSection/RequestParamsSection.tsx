'use client';

import ParamsTable from '../ParamsTable/ParamsTable';
import styles from './RequestParamsSection.module.scss';
import { useReducer, useState, MutableRefObject, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface VariableField {
  id: number;
  paramKey: string;
  paramValue: string;
}

interface RequestParamsState {
  showHeaderVariables: boolean;
  showVariables: boolean;
  headerVariables: VariableField[];
  variables: VariableField[];
  lastShown: 'variables' | 'header';
}

export type variablesActions =
  | { type: 'showed_variables' }
  | { type: 'showed_headers' }
  | { type: 'toggled_show' }
  | { type: 'added_option'; option: 'variables' | 'headers'; index: number }
  | { type: 'edited_option'; option: 'variables' | 'headers'; index: number; key?: string; value?: string }
  | { type: 'removed_option'; option: 'variables' | 'headers'; index: number };

const initialState: RequestParamsState = {
  showHeaderVariables: false,
  showVariables: false,
  headerVariables: [{ id: 0, paramKey: '', paramValue: '' }],
  variables: [{ id: 0, paramKey: '', paramValue: '' }],
  lastShown: 'variables',
};

function reducer(state: RequestParamsState, action: variablesActions): RequestParamsState {
  switch (action.type) {
    case 'showed_variables': {
      if (state.showHeaderVariables) {
        return {
          ...state,
          showVariables: !state.showVariables,
          showHeaderVariables: false,
          lastShown: 'variables',
        };
      }
      return { ...state, showVariables: !state.showVariables, lastShown: 'variables' };
    }
    case 'showed_headers': {
      if (state.showVariables) {
        return {
          ...state,
          showVariables: false,
          showHeaderVariables: !state.showHeaderVariables,
          lastShown: 'header',
        };
      }
      return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
    }
    case 'toggled_show': {
      if (state.showVariables) {
        return { ...state, showVariables: !state.showVariables, lastShown: 'variables' };
      } else if (state.showHeaderVariables) {
        return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
      } else {
        if (state.lastShown == 'variables') {
          return { ...state, showVariables: !state.showVariables, lastShown: 'variables' };
        } else {
          return { ...state, showHeaderVariables: !state.showHeaderVariables, lastShown: 'header' };
        }
      }
    }

    case 'added_option': {
      const option = action.option == 'headers' ? 'headerVariables' : 'variables';
      const newArray = [...state[option], { id: action.index, paramKey: '', paramValue: '' }];
      return {
        ...state,
        [option]: newArray,
      };
    }

    case 'edited_option': {
      const option = action.option == 'headers' ? 'headerVariables' : 'variables';
      const newArray = [...state[option]].map(item => {
        if (item.id == action.index) {
          if (action.key || action.key == '') {
            return { ...item, paramKey: action.key };
          } else if (action.value || action.value == '') {
            return { ...item, paramValue: action.value };
          }
        }
        return { ...item };
      });
      return {
        ...state,
        [option]: newArray,
      };
    }

    case 'removed_option': {
      const option = action.option == 'headers' ? 'headerVariables' : 'variables';
      if (action.index + 1 == state[option].length) {
        return { ...state };
      }
      const newArray = [...state[option]]
        .filter(({ id }) => id !== action.index)
        .map((field, index) => ({
          ...field,
          id: index,
        }));
      return {
        ...state,
        [option]: newArray,
      };
    }
    default:
      return state;
  }
}

export default function RequestParamsSection({ parentContainerRef }: { parentContainerRef: MutableRefObject<null> }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [height, setHeight] = useState<number>(40);
  const [startY, setStartY] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state.headerVariables.length >= 1) {
      const headers = state.headerVariables
        .slice(0, -1)
        .map(header => `${encodeURIComponent(header.paramKey)}=${encodeURIComponent(header.paramValue)}`)
        .join('&');
      if (router) {
        router.push(`${pathname}?${headers}`);
      }
    }
  }, [state.headerVariables]);

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
          className={`${styles.paramChooseButton} ${state.showVariables ? styles.buttonActive : ''}`}
          onClick={() => {
            dispatch({ type: 'showed_variables' });
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
      {state.showVariables ? (
        <ParamsTable tableFor="variables" elements={state.variables} dispatcher={dispatch}></ParamsTable>
      ) : state.showHeaderVariables ? (
        <ParamsTable tableFor="headers" elements={state.headerVariables} dispatcher={dispatch}></ParamsTable>
      ) : (
        ''
      )}
    </div>
  );
}
