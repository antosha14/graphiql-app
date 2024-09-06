const visibilityLocalStorageName = 'visibility';
import { RequestParamsVisibilityState } from '@components/Rest/RestClient/RestClient';

const initialVisibilityState = { show: 'nothing', lastShown: 'variables' };

export const updateVisibilityInSs = (visibilityState: RequestParamsVisibilityState) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(visibilityLocalStorageName, JSON.stringify(visibilityState));
  }
};

export const getVisibilityState = () => {
  if (typeof window !== 'undefined') {
    const visibilityFromLs = sessionStorage.getItem(visibilityLocalStorageName);
    if (!visibilityFromLs) {
      sessionStorage.setItem(visibilityLocalStorageName, JSON.stringify(initialVisibilityState));
    }
    return visibilityFromLs ? JSON.parse(visibilityFromLs) : initialVisibilityState;
  }
};
