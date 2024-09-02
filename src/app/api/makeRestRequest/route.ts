// import { NextApiRequest, NextApiResponse } from 'next';

// interface RequestBody {
//   url: string;
//   method: string;
//   headers?: Record<string, string>;
//   body?: string;
//   queryParams?: Record<string, string>;
// }

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { url, method, headers, body, queryParams }: RequestBody = req.body;
//   console.log(req.body);

//   if (!url || typeof url !== 'string') {
//     return res.status(400).json({ error: 'URL is required' });
//   }

//   const requestOptions: RequestInit = {
//     method: req.method,
//     headers: {
//       ...req.headers,
//       'Content-Type': req.method !== 'GET' ? 'application/json' : undefined,
//     },
//     body: req.method !== 'GET' ? JSON.stringify(req.body) : null,
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     const data = await response.json();

//     res.status(response.status).json(data);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Error making request' });
//   }
// }
