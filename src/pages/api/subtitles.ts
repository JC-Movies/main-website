import { NextApiRequest, NextApiResponse } from "next";
import url from "url";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers, body } = req;
  const referrer = new URL(req.headers.referer || "");
  if (!referrer || !referrer.host)
    return res.status(401).json({ error: "Unauthorized" });
  if (
    ![referrer.host, referrer.hostname, referrer.origin].includes(
      process.env.NEXT_PUBLIC_BASEURL!
    )
  )
    return res.status(401).json({ error: "Unauthorized" });
  const parsedUrl = new url.URL(req.url || "", "http://localhost");

  const query = parsedUrl.searchParams.get("query")?.toLowerCase() || "";
  const language = parsedUrl.searchParams.get("language") || "";
  const tmdbId = parsedUrl.searchParams.get("tmdbId") || "";
  const season = parsedUrl.searchParams.get("season") || "";
  const episode = parsedUrl.searchParams.get("episode") || "";

  try {
    const results = await fetch(
      `https://api.gestdown.info/shows/search/${query}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );

    if (!results.ok) {
      throw new Error("Failed to fetch show data");
    }

    const shows: any = await results.json();


    const showId =
      shows.shows.find((show: any) => show.tmdbId === Number(tmdbId))?.id ||
      null;


    if (!showId) {
      return res.status(404).json({ error: "Show not found" });
    }

    const subs = await fetch(
      `https://api.gestdown.info/subtitles/get/${showId}/${season}/${episode}/${language}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );

    if (!subs.ok) {
      return res.status(subs.status).json({ error: "Subtitles not found" });
    }

    const subsData: any = await subs.json();


    const selected =
      subsData.matchingSubtitles.find(
        (sub: any) =>
          sub.downloadCount ===
          Math.max(
            ...subsData.matchingSubtitles.map((sub: any) => sub.downloadCount)
          )
      ) || subsData.matchingSubtitles[0];


    if (!selected) {
      return res.status(404).json({ error: "Subtitles not found" });
    }

    const response = await fetch(
      `https://api.gestdown.info/subtitles/download/${selected.subtitleId}`,
      {
        method: "GET",
        headers: { accept: "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Subtitles: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json();
      res.status(response.status).json(responseData);
    } else {
      const responseBody = await response.text();
      res.status(response.status).send(responseBody);
    }
  } catch (error: any) {
    console.error("Error subtitles:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
}
