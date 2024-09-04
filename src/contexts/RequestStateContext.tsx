'use client';

import { createContext, ReactElement, useContext, useState, Dispatch, SetStateAction } from 'react';

export interface RestRequestState {
  status: 'noRequest' | 'pending' | 'displayed' | 'displayError';
  response: { status: number; statusText: string; duration?: number; contentLength?: string; data: string };
}

const initialStatus = { status: 0, statusText: '', duration: 0, contentLength: '0', data: '' };

const initialRestRequestState: RestRequestState = {
  status: 'noRequest',
  response: initialStatus,
};

const RequestContext = createContext(initialRestRequestState);
const RequestUpdateContext = createContext<Dispatch<SetStateAction<RestRequestState>> | undefined>(undefined);

const useRestRequest = () => {
  return useContext(RequestContext);
};

const useRequestUpdateContext = () => {
  return useContext(RequestUpdateContext);
};

const RestProvider = ({ children }: { children: ReactElement }) => {
  const [requestState, setRequestState] = useState(initialRestRequestState);
  return (
    <RequestContext.Provider value={requestState}>
      <RequestUpdateContext.Provider value={setRequestState}>{children}</RequestUpdateContext.Provider>
    </RequestContext.Provider>
  );
};

export default RestProvider;
export { useRestRequest, useRequestUpdateContext };
