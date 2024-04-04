const url = require('url'); // Require the url module
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  const { method, headers, body } = req;
  const parsedUrl = url.parse(req.url, true); // Parse URL
  // const referrer = new URL(req.headers.referer || "");
  // if(!referrer || !referrer.host) return res.status(401).json({ error: "Unauthorized" });
  // if(![referrer.host, referrer.hostname, referrer.origin].includes(process.env.NEXT_PUBLIC_BASEURL!)) return res.status(401).json({ error: "Unauthorized" });
  const destination = parsedUrl.query.destination; // Extract query parameter

  try {
    const response = await fetch(destination, {
      method,
      //@ts-expect-error
      headers: {
        ...headers,
        "User-Agent": "Mozilla/5.0",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${destination}: ${response.statusText}`);
    }

    // const responseData = await response.json();

    // res.status(response.status).json(responseData);
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      res.status(response.status).json(responseData);
    } else {
      // Handle non-JSON response
      const responseBody = await response.text();
      res.status(response.status).send(responseBody);
    }
  } catch (error: any) {
    console.error("Error proxying:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};
