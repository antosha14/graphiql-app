import { httpStatusCodes } from '@models/httpStatusCodes';
import { VariableField } from '@components/Rest/AdditionalVariablesSection/RequestParamsSection';

type HeadersObject = { [key: string]: string };

export async function POST(req: Request) {
  try {
    const { url, method, headers, body } = await req.json();
    const startTime = Date.now();

    if (!url) {
      return Response.json(
        { error: 'The provided URL is not valid. Please check the URL and try again.' },
        { status: 400 }
      );
    }

    let validHeaders = [];
    if (headers !== '') {
      validHeaders = headers.filter((entry: VariableField) => entry.paramKey && entry.paramValue);
    }
    const headersObject: HeadersObject = validHeaders.reduce(
      (acc: HeadersObject, { paramKey, paramValue }: { paramKey: string; paramValue: string }) => {
        acc[paramKey] = paramValue;
        return acc;
      },
      {}
    );

    const requestOptions: RequestInit = {
      method: method !== 'GRAPHQL' ? method : 'POST',
      headers: headers === '' ? undefined : new Headers(headersObject),
      body: method !== 'GET' ? body : null,
    };
    const response = await fetch(url, requestOptions);
    const requestDuration = Date.now() - startTime;
    const statusText = response.statusText || httpStatusCodes[Number(response.status)] || 'Unknown Status';
    const contentLength = response.headers.get('content-length') || '0';

    let data;
    if (response.ok) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    const responseData = {
      status: response.status,
      statusText: statusText,
      duration: requestDuration,
      contentLength: contentLength,
      data: data,
    };
    return Response.json({ ...responseData });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to parse URL')) {
      return Response.json(
        { error: 'The provided URL is not valid. Please check the URL and try again.' },
        { status: 400 }
      );
    }

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while executing your request. Please try again.';
    const statusCode = error instanceof Response ? error.status : 500;
    return Response.json({ error: errorMessage }, { status: statusCode });
  }
}
