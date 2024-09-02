const visibilityLocalStorageName = 'visibility';
import { RequestParamsVisibilityState } from '@components/Rest/RestClient/RestClient';

const initialVisibilityState = { show: 'nothing', lastShown: 'variables' };

export const updateVisibilityInSs = (visibilityState: RequestParamsVisibilityState) => {
  sessionStorage.setItem(visibilityLocalStorageName, JSON.stringify(visibilityState));
};

export const getVisibilityState = () => {
  const visibilityFromLs = sessionStorage.getItem(visibilityLocalStorageName);
  if (!visibilityFromLs) {
    sessionStorage.setItem(visibilityLocalStorageName, JSON.stringify(initialVisibilityState));
  }
  return visibilityFromLs ? JSON.parse(visibilityFromLs) : initialVisibilityState;
};
