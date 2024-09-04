'use client';

const variablesLocalStorageName = 'variables';
const queriesLocalStorageName = 'queries';

export interface Variable {
  id: number;
  paramKey: string;
  paramValue: string;
}

export interface Query {
  url: string;
  method: string;
  body: string;
  headers: Variable[];
  status: number;
  statusText: string;
}

export const addQueryToLs = (query: Query) => {
  const queriesFromLs = localStorage.getItem(queriesLocalStorageName);
  if (!queriesFromLs) {
    localStorage.setItem(queriesLocalStorageName, JSON.stringify([]));
  } else {
    const parsedQueries: Query[] = JSON.parse(queriesFromLs);
    const newQuery: Query = {
      ...query,
      body: JSON.parse(query.body),
      headers: query.headers.slice(0, -1),
    };
    parsedQueries.push(newQuery);
    localStorage.setItem(queriesLocalStorageName, JSON.stringify(parsedQueries));
  }
};

export const getAllQueries = () => {
  const queriesString = localStorage.getItem(queriesLocalStorageName);
  return queriesString ? JSON.parse(queriesString) : [];
};

export const updateVariablesInLs = (variables: Variable[]) => {
  localStorage.setItem(variablesLocalStorageName, JSON.stringify(variables));
};

export const getAllVariablesFromLs = () => {
  const variablesString = localStorage.getItem(variablesLocalStorageName);
  if (!variablesString) {
    localStorage.setItem(variablesLocalStorageName, JSON.stringify([{ id: 0, paramKey: '', paramValue: '' }]));
  }
  return variablesString ? JSON.parse(variablesString) : [{ id: 0, paramKey: '', paramValue: '' }];
};
