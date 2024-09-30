'use client';

import styles from './RestClient.module.scss';
import RequestBar from '../RequestBar/RequestBar';
import RequestParamsSection from '../AdditionalVariablesSection/RequestParamsSection';
import { useReducer } from 'react';
import { getVisibilityState, updateVisibilityInSs } from '@utils/useSessionStorage';

export interface RequestParamsVisibilityState {
  show: 'headers' | 'variables' | 'nothing';
  lastShown: 'headers' | 'variables';
}

export type VisibilityActions = { type: 'showed_variables' } | { type: 'showed_headers' } | { type: 'toggled_show' };

function reducer(state: RequestParamsVisibilityState, action: VisibilityActions): RequestParamsVisibilityState {
  switch (action.type) {
    case 'showed_variables': {
      const newVisibilityState: RequestParamsVisibilityState =
        state.show == 'variables'
          ? { show: 'nothing', lastShown: 'variables' }
          : { show: 'variables', lastShown: 'variables' };
      updateVisibilityInSs(newVisibilityState);
      return { ...state, ...newVisibilityState };
    }

    case 'showed_headers': {
      const newVisibilityState: RequestParamsVisibilityState =
        state.show == 'headers' ? { show: 'nothing', lastShown: 'headers' } : { show: 'headers', lastShown: 'headers' };
      updateVisibilityInSs(newVisibilityState);
      return { ...state, ...newVisibilityState };
    }
    case 'toggled_show': {
      let newVisibilityState: RequestParamsVisibilityState = {
        show: 'nothing',
        lastShown: 'variables',
      };
      if (state.show == 'variables') {
        newVisibilityState = {
          show: 'nothing',
          lastShown: 'variables',
        };
      } else if (state.show == 'headers') {
        newVisibilityState = {
          show: 'nothing',
          lastShown: 'headers',
        };
      } else {
        if (state.lastShown == 'variables') {
          newVisibilityState = {
            show: 'variables',
            lastShown: 'variables',
          };
        } else {
          newVisibilityState = {
            show: 'headers',
            lastShown: 'headers',
          };
        }
      }
      updateVisibilityInSs(newVisibilityState);
      return { ...state, ...newVisibilityState };
    }
  }
}

export default function RestClient() {
  const [state, dispatch] = useReducer(reducer, {
    ...getVisibilityState(),
  });
  return (
    <section className={styles.restClientContainer}>
      <RequestBar height={state.show == 'nothing' ? 415 : 320}></RequestBar>
      <RequestParamsSection showState={state.show} dispatchViewAction={dispatch}></RequestParamsSection>
    </section>
  );
}
