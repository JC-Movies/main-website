"use client";
import { X } from "lucide-react";
import axios from "axios";
import { Card } from "@/components/cards-provider";
import { useState, useEffect, useMemo, useCallback } from "react";

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: string[];
  release_date: string;
}

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: PageProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const page = searchParams.page || 1;
  const updateMovies = useCallback(() => {
    if (movies.length > 0) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/tmdb?type=movieTop&page=${page || 1}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [movies]);
  useEffect(() => {
    updateMovies();
  }, [page]);

  const [favMovies, setFavMovies] = useState<any[]>([]);
  const userId = localStorage?.getItem("userId");
  if (movies.length === 0) {
    return (
      <div className="text-center py-4 bg-white dark:bg-slate-800 shadow-md rounded-b-md ">
        <X className="mx-auto w-8 h-8 text-red-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-slate-100">
          No Results
        </h3>
        <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500 dark:text-slate-300">
          Sorry Pal, we couldn't find any matches for{" "}
          <span className="text-red-500 font-medium">{page}</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 bg-white dark:bg-slate-800 dark:divide-slate-700 shadow-md rounded-b-md">
        {movies.map((movie) => (
          <Card
            className="col-span-1"
            key={movie.id}
            title={movie.title}
            description={movie.overview}
            id={movie.id}
            type={"movie"}
            image={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                : `https://placehold.co/220x330?text=${movie.title}`
            }
            isFavorited={favMovies.some((m) => m.movieId === movie.id)}
            tags={movie.genre_ids}
            date={movie.release_date.substring(0, 4) || "N/A"}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
export const runtime = "edge";
