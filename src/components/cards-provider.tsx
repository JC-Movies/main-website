"use client";
// import { FavoriteMovies, FavoriteSeries } from "@/db/schema";
import React, { useEffect } from "react";
import { BackgroundGradient } from "./ui/bg-gradient";
// import connectDB from "@/db";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toggle } from "./ui/toggle";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useMediaQuery from "@/hooks/useMediaQuery";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export function Card({
  title,
  description,
  id,
  type,
  image,
  className,
  isFavorited,
  date,
  tags,
}: {
  title: string;
  description: string;
  id: string;
  type: string;
  image: string;
  className?: string;
  isFavorited?: boolean;
  date?: string;
  tags?: string[];
}) {
  const [isFavorite, setIsFavorite] = React.useState(isFavorited || false);
  const { toast } = useToast();
  const router = useRouter();
  const watchNow = () => {
    router.push(`/${type}/${id}`);
  };
  const addToFavorites = async () => {
    toast({
      title: "Added to favorites",
      description: `${title} added to favorites`,
    });
  };
  interface Genre {
    id: number;
    name: string;
  }

  const genresNames: Genre[] = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
  ];
  function getGenreNameById(id: number): string | undefined {
    const genre = genresNames.find((genre) => genre.id === id);
    return genre ? genre.name : undefined;
  }
  const getFavs = async () => {
    // const userId = localStorage?.getItem("userId");
    // const response = await axios.get(`/api/favorite`, {
    //   params: {
    //     userId,
    //     type: "get",
    //   },
    // });
    // if (type === "movie") {
    //   setIsFavorite(
    //     response.data.movies.some((movie: any) => movie.movieId === id)
    //   );
    // } else {
    //   setIsFavorite(
    //     response.data.series.some((serie: any) => serie.serieId === id)
    //   );
    // }
  };
  useEffect(() => {
    getFavs();
  }, [!isFavorite, !isFavorited]);
  const matches = useMediaQuery("( min-width: 768px )");
  return (
    <div className={className}>
      <BackgroundGradient
        className={
          matches
            ? "rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900"
            : "rounded-[22px] max-w-sm p-5 bg-white dark:bg-zinc-900"
        }
      >
        <Image
          onClick={watchNow}
          src={image || "https://via.placeholder.com/300?text=" + title}
          alt={`${title} image`}
          height="500"
          width="300"
          loader={() =>
            image || "https://via.placeholder.com/300?text=" + title
          }
          loading="eager"
          priority
          quality={80}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          className="object-contain rounded-md cursor-pointer"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {title}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
          {description}
        </p>
        <div className="text-sm text-zinc-200 bg-zinc-800/80 rounded-sm p-2 mt-2">
          <p className="text-base mb-2">
            {type === "movie" ? "Movie" : "TV Show"}
          </p>
          <p className="text-base mb-2">{date}</p>
          <span className="mt-2">
            {tags?.map((tag: any) => (
              <span
                key={tag}
                className="text-sm text-zinc-200 bg-zinc-900 rounded-sm p-1 mr-1"
              >
                {getGenreNameById(tag)}{" "}
              </span>
            ))}
          </span>
        </div>
        <button
          className={
            matches ? "p-[3px] relative mt-5" : "p-[2px] relative mt-2"
          }
          onClick={watchNow}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div
            className={
              matches
                ? "px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent"
                : "px-4 py-1  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent"
            }
          >
            {matches ? "Watch Now" : "Watch"}
          </div>
        </button>

        <Toggle
          className="absolute top-3 right-3 bg-white dark:bg-zinc-900 rounded-full hover:dark:bg-zinc-800 hover:bg-zinc-200"
          onClick={() => {
            addToFavorites();
          }}
        >
          {
            <Heart
              className="text-red-500"
              fill={isFavorite ? "red" : "none"}
            />
          }
        </Toggle>
      </BackgroundGradient>
    </div>
  );
}
