"use client";
import { Card } from "@/components/cards-provider";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { LampContainer } from "@/components/ui/lamp";
type HomeProps = {
  params: { locale: string };
};
export default function Home({ params: { locale } }: HomeProps) {
  const [movies, setMovies] = useState<any[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/tmdb?type=trending`);
        const movies = [];
        const series = [];
        for (const result of response.data.results) {
          if (result.media_type === "movie") {
            movies.push(result);
          } else if (result.media_type === "tv") {
            series.push(result);
          }
        }
        setMovies(movies);
        setSeries(series);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [!movies.length && !series.length]);
  return (
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Trending Movies
        </motion.h1>
      </LampContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies &&
          movies.map((movie: any) => (
            <Card
              key={movie.id}
              title={movie.title}
              description={movie.overview}
              id={movie.id}
              type={movie.media_type}
              image={
                movie.poster_path
                  ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`
                  : `https://placehold.co/220x330?text=${movie.title}`
              }
              date={movie.release_date.substring(0, 4) || "N/A"}
              tags={movie.genre_ids}
            />
          ))}
      </div>

      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Trending TV Shows
        </motion.h1>
      </LampContainer>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {series &&
          series.map((serie: any) => (
            <Card
              key={serie.id}
              title={serie.name}
              description={serie.overview}
              id={serie.id}
              type={serie.media_type}
              image={
                serie.poster_path
                  ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${serie.poster_path}`
                  : `https://placehold.co/220x330?text=${serie.name}`
              }
              date={serie.first_air_date.substring(0, 4) || "N/A"}
              tags={serie.genre_ids}
            />
          ))}
      </div>
    </div>
  );
}
