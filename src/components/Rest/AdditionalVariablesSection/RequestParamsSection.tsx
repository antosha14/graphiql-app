'use client';

import ParamsTable from '../ParamsTable/ParamsTable';
import styles from './RequestParamsSection.module.scss';
import { useReducer, useEffect, Dispatch } from 'react';
import { useRouter, usePathname, useSearchParams, ReadonlyURLSearchParams } from 'next/navigation';
import { updateVariablesInLs, getAllVariablesFromLs } from '@utils/useLocalStorage';
import { VisibilityActions } from '../RestClient/RestClient';

export interface VariableField {
  id: number;
  paramKey: string;
  paramValue: string;
}

interface RequestParamsState {
  headerVariables: VariableField[];
  variables: VariableField[];
}

export type variablesActions =
  | { type: 'added_option'; option: 'variables' | 'headers'; index: number }
  | { type: 'edited_option'; option: 'variables' | 'headers'; index: number; key?: string; value?: string }
  | { type: 'removed_option'; option: 'variables' | 'headers'; index: number };

function reducer(state: RequestParamsState, action: variablesActions): RequestParamsState {
  switch (action.type) {
    case 'added_option': {
      const option = action.option == 'headers' ? 'headerVariables' : 'variables';
      const newEntry = { id: action.index, paramKey: '', paramValue: '' };
      const newArray = [...state[option], newEntry];
      if (option == 'variables') {
        updateVariablesInLs(newArray);
      }
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

      if (option == 'variables') {
        updateVariablesInLs(newArray);
      }

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

      if (option == 'variables') {
        updateVariablesInLs(newArray);
      }

      return {
        ...state,
        [option]: newArray,
      };
    }
    default:
      return state;
  }
}

export const parseQueryparams = (searchParams: ReadonlyURLSearchParams) => {
  const params: VariableField[] = [];
  let index = 0;
  searchParams.forEach((value, key) => {
    params.push({ id: index, paramKey: key, paramValue: value });
    index++;
  });
  params.push({ id: params.length, paramKey: '', paramValue: '' });
  return params;
};

export default function RequestParamsSection({
  dispatchViewAction,
  showState,
}: {
  dispatchViewAction: Dispatch<VisibilityActions>;
  showState: 'headers' | 'variables' | 'nothing';
}) {
  const queryParams = useSearchParams();
  const [state, dispatch] = useReducer(reducer, {
    headerVariables: parseQueryparams(queryParams),
    variables: getAllVariablesFromLs(),
  });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state.headerVariables.length >= 1) {
      const headers = state.headerVariables
        .slice(0, -1)
        .map(header => `${encodeURIComponent(header.paramKey)}=${encodeURIComponent(header.paramValue)}`)
        .join('&');
      if (router) {
        router.push(`${pathname}?${headers}`, { scroll: false });
      }
    }
  }, [state.headerVariables]);

  return (
    <div className={styles.paramsContainer}>
      <div className={styles.paramsSelectionContainer} onMouseDown={() => 'i'}>
        <button
          className={`${styles.paramChooseButton} ${showState == 'variables' ? styles.buttonActive : ''}`}
          onClick={() => {
            dispatchViewAction({ type: 'showed_variables' });
          }}
        >
          Variables
        </button>
        <button
          className={`${styles.paramChooseButton} ${showState == 'headers' ? styles.buttonActive : ''}`}
          onClick={() => {
            dispatchViewAction({ type: 'showed_headers' });
          }}
        >
          Headers
        </button>
        <button
          className={styles.paramShowButton}
          onClick={() => {
            dispatchViewAction({ type: 'toggled_show' });
          }}
        >
          <svg height="1em" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>Chevron icon</title>
            {showState == 'nothing' ? (
              <path d="M13 8L7 2L1 8" stroke="currentColor"></path>
            ) : (
              <path d="M1 1L7 7L13 1" stroke="currentColor"></path>
            )}
          </svg>
        </button>
      </div>
      {showState == 'variables' ? (
        <ParamsTable tableFor="variables" elements={state.variables} dispatcher={dispatch}></ParamsTable>
      ) : (
        showState == 'headers' && (
          <ParamsTable tableFor="headers" elements={state.headerVariables} dispatcher={dispatch}></ParamsTable>
        )
      )}
    </div>
  );
}
