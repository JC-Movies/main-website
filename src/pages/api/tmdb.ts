import { NextApiRequest, NextApiResponse } from "next";
const apiKey = process.env.NEXT_PUBLIC_APIKEY; // Replace with your TMDB API key
const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { type, id, season_number, episode_number, query, page },
  } = req;

  try {
    let response;
    const referrer = new URL(req.headers.referer || "");
    if(!referrer || !referrer.host) return res.status(401).json({ error: "Unauthorized" });
    if(![referrer.host, referrer.hostname, referrer.origin].includes(process.env.NEXT_PUBLIC_BASEURL!)) return res.status(401).json({ error: "Unauthorized" });
    switch (type) {
      case "trending":
        response = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=${apiKey}`
        );
        break;
      case "search":
        response = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiToken,
            },
          }
        );
        break;
      case "movie":
        response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=external_ids,credits`
        );
        break;
      case "movieCast":
        response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
        );
        break;
      case "tvShow":
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=external_ids,credits`
        );
        break;
      case "tvShowCast":
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`
        );
        break;
      case "seasondata":
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${apiKey}`
        );
        break;
      case "episodedata":
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${apiKey}`
        );
        break;
      case "episodes":
        response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${apiKey}`
        );
        break;
      case "tvTop":
        response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${
            page || 1
          }&sort_by=popularity.desc`,
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiToken,
            },
          }
        );
        break;
      case "movieTop":
        response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${
            page || 1
          }&sort_by=popularity.desc`,
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + apiToken,
            },
          }
        );
        break;
      default:
        return res.status(400).json({ error: "Invalid type" });
    }

    if (!response.ok) {
      throw new Error("TMDB API request failed");
    }

    const responseData = await response.json();
    res.json(responseData);
  } catch (error: any) {
    console.error("TMDB API request failed:", error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "An error occurred" });
  }
}
