"use client";
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Card } from '@/components/cards-provider';

interface PageProps {
  searchParams: {
    [key: string]: string;
  };
}

const Page = ({ searchParams }: PageProps) => {
  const [movies, setMovies] = useState<any[]>([]);
  const query = searchParams?.query;
  const router = useRouter();
  const [favMovies, setFavMovies] = useState<any[]>([]);
  const [favSeries, setFavSeries] = useState<any[]>([]);
  let userId = localStorage && localStorage?.getItem("userId");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!userId) {
  //         userId = uuidv4();
  //         localStorage.setItem("userId", userId!);
  //         return;
  //       }
  //       const response = await axios.get(`/api/favorite`, {
  //         params: {
  //           userId,
  //           type: "get",
  //         },
  //       });
  //       const movies = [];
  //       const series = [];
  //       for (const movie of response.data.movies) {
  //         movies.push(movie);
  //       }
  //       for (const serie of response.data.series) {
  //         series.push(serie);
  //       }
  //       setFavMovies(movies);
  //       setFavSeries(series);
  //     } catch (error) {
  //       console.error("Error fetching movies:", error);
  //     }
  //   };
  //   fetchData();
  // }, [!favMovies.length && !favSeries.length]);
  useEffect(() => {
    if (Array.isArray(query) || !query) {
      router.push('/');
      return;
    }
    axios.get(`/api/tmdb?type=search&query=${query}`).then(function (response: any) {
      setMovies(response.data.results);
    });
  }, [query, router]);
  function dateYear(date: string) {
    if (!date) return null
    return date.substring(0, 4);
  }
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-4 bg-white dark:bg-slate-800 shadow-md rounded-b-md ">
        <X className="mx-auto w-8 h-8 text-red-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-slate-100">
          No Results
        </h3>
        <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500 dark:text-slate-300">
          Sorry Pal, we couldn't find any matches for{' '}
          <span className="text-red-500 font-medium">{query}</span>
        </p>
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4 bg-white dark:bg-slate-800 dark:divide-slate-700 shadow-md rounded-b-md">
        {movies && movies.map((movie: any) => (
          movie.poster_path && <Card
            key={movie.id}
            title={movie.title || movie.name}
            description={movie.overview}
            id={movie.id}
            type={movie.media_type}
            image={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                : `https://placehold.co/220x330?text=${movie.title}`
            }
            isFavorited={favMovies.some(
              (favMovie: any) => favMovie.movieId === movie.id
            ) || favSeries.some(
              (favSerie: any) => favSerie.serieId === movie.id
            )}
            date={dateYear(movie.release_date || movie.first_air_date)?.toString() || "N/A"}
            tags={movie.genre_ids}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
export const runtime = "edge";