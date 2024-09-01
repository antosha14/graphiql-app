import { getAllVariablesFromLs } from './useLocalStorage';
import { Variable } from './useLocalStorage';

export function parseRequestBody(data: string) {
  const variables = getAllVariablesFromLs();
  const variablesRegex = /{{(.*?)}}/g;
  const parsedRequestBody = data.replace(variablesRegex, match => {
    const matchedEntry = variables.find((item: Variable) => item.paramKey === match.slice(2, -2));
    return `"${matchedEntry.paramValue}"`;
  });
  return parsedRequestBody;
}
