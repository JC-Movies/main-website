"use client";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import axios from "axios";
import { Card } from "@/components/cards-provider";
import SearchBar from "@/components/search-bar";
import { useState, useEffect, useCallback } from "react";

interface Show {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: string[];
  first_air_date: string;
}

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}


const Page = ({ searchParams }: PageProps) => {
  const [shows, setShows] = useState<Show[]>([]);

  const query = searchParams.genre;
  const updateShows = useCallback(() => {
    if (shows.length > 0) {
      return;
    }
    const fetchData = async () => {
        try {
          const response = await axios.get(`/api/tmdb?type=tvTop`);
          setShows(response.data.results);

          // Cache the shows
          localStorage.setItem("cachedShows", JSON.stringify(response.data.results.slice(0, 20)));
        } catch (error) {
          console.error("Error fetching shows:", error);
        }
    };
    // Check if shows are cached
    const cachedShows = localStorage.getItem("cachedShows");
    if (cachedShows && cachedShows?.length > 0) {
      setShows(JSON.parse(cachedShows));
    } else {
      fetchData(); // Fetch shows if not cached
    }
  }, [shows]);
  useEffect(() => {
    updateShows();
  }, [query]);
  const [favSeries, setFavSeries] = useState<any[]>([]);
  const userId = localStorage?.getItem("userId");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!userId) {
  //         return;
  //       }
  //       const response = await axios.get(`/api/favorite`, {
  //         params: {
  //           userId,
  //           type: "get",
  //         },
  //       });
  //       const series = [];
  //       for (const serie of response.data.series) {
  //         series.push(serie);
  //       }
  //       setFavSeries(series);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   };
  //   fetchData();
  // }, [!favSeries.length]);

  if (shows.length === 0) {
    return (
      <div className="text-center py-4 bg-white dark:bg-slate-800 shadow-md rounded-b-md ">
        <X className="mx-auto w-8 h-8 text-red-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-slate-100">No Results</h3>
        <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500 dark:text-slate-300">
          Sorry Pal, we couldn't find any matches for{" "}
          <span className="text-red-500 font-medium">{query}</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="p-4">
        <SearchBar />
      </div> */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 bg-white dark:bg-slate-800 dark:divide-slate-700 shadow-md rounded-b-md">
        {shows.map((show) => (
          <Card className="col-span-1"
            key={show.id}
            title={show.title}
            description={show.overview}
            id={show.id}
            type={"tv"}
            image={
              show.poster_path
                ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${show.poster_path}`
                : `https://placehold.co/220x330?text=${show.title}`
            }
            isFavorited={favSeries.some((serie) => serie.serieId === show.id)}
            tags={show.genre_ids}
            date={show.first_air_date.substring(0, 4) || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
export const runtime = "edge";