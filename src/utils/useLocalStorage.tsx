const variablesLocalStorageName = 'variables';
const queriesLocalStorageName = 'queries';

export interface Variable {
  id: number;
  paramKey: string;
  paramValue: string;
}

export const addQueryToLs = () => {};

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
