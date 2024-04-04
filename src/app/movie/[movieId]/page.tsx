"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { BackgroundGradient } from "@/components/ui/bg-gradient";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";
import { VideoPlayer } from "@/providers/player";
import providers from "@/providers/movie-web";
import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Star, StarHalf } from "lucide-react";
interface PageProps {
  params: {
    movieId: string;
  };
}

const Page = ({ params }: PageProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const [showDetails, setShowDetails] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [media, setMedia] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const people = cast.slice(0, 10).map((person, idx) => {
    return {
      id: idx,
      name: person.name,
      designation: person.character,
      image: `https://image.tmdb.org/t/p/original${person.profile_path}`,
    };
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/tmdb?type=movieCast&id=${params.movieId}`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };
    fetchData();
  }, [params.movieId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/tmdb?type=movie&id=${params.movieId}`
        );
        setShowDetails(response.data);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };

    fetchData();
  }, [params.movieId]);
  useEffect(() => {
    if (showDetails && showDetails.title && showDetails.id) {
      document.title = `${showDetails.title} - ${parseInt(
        showDetails.release_date.substring(0, 4)
      )}`;
      console.log(showDetails);
      mediaChangeHandler();
    }
  }, [showDetails]);
  useEffect(() => {
    streamChangeHandler();
  }, [media]);
  const streamChangeHandler = async () => {
    try {
        const output = await providers.runAll({
          media: {
            type: "movie",
            title: showDetails.title,
            releaseYear: parseInt(showDetails.release_date.substring(0, 4)),
            imdbId: showDetails.external_ids.imdb_id,
            tmdbId: showDetails.id,
          },
          sourceOrder: ["vidsrc","flixhq"],
        // embedOrder: ["voe", "streamvid"],
        });

        if (output !== null) {
          setVideoUrl(output);
        }
    } catch (err) {
      console.log(err);
    }
  };

  const mediaChangeHandler = () => {
    if (!showDetails || !showDetails.title || !showDetails.id) {
      return;
    }

    const media = {
      title: showDetails.title,
      releaseYear: parseInt(showDetails.release_date.substring(0, 4)),
      tmdbId: showDetails.id,
      imdbId: showDetails.imdb_id,
    };

    setMedia(media);
  };
  return (
    <div>
      <div className="flex justify-center content-center">
        <div
          className={`${
            matches ? "w-[95%]" : "w-[95%] sm:w-[90%]"
          } aspect-w-16 aspect-h-9`}
        >
          {showDetails && videoUrl ? (
            <VideoPlayer src={videoUrl} details={showDetails} />
          ) : (
            <Skeleton
              className={`bg-black w-full ${matches ? "h-[80vh]" : "h-[30vh]"}`}
            />
          )}
        </div>
      </div>

      {showDetails && (
        <div className="rounded-3xl m-5 bg-slate-500/50 dark:bg-slate-800/50 sm:rounded-3xl justify-center items-center">
          <BackgroundGradient>
            <div
              className={
                matches
                  ? "pb-10 pl-5 bg-slate-900/60 rounded-3xl"
                  : "pb-10 bg-slate-900/60 rounded-3xl"
              }
            >
              <div className="text-center text-3xltext-4xl pt-5 font-bold tracking-tight">
                <h1>{showDetails.title}</h1>
              </div>
              <div className={matches ? "flex pt-10" : "pt-5"}>
                <Image
                  width={matches ? 500 : 300}
                  height={matches ? 500 : 300}
                  loading="lazy"
                  className="rounded-3xl p-5"
                  src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
                  alt={showDetails.title}
                />
                <div className={matches ? "flex flex-col" : ""}>
                  <div
                    className={
                      matches
                        ? "text-4xl p-5 font-bold tracking-tight text-yellow-500"
                        : "p-3 tracking-tight text-3xl text-yellow-500"
                    }
                  >
                    <span className="flex">
                      IMDB: {showDetails.vote_average.toFixed(1)} / 10{" "}
                      {showDetails.vote_average.toFixed(1) > 7 ? (
                        <Star fill="yellow" />
                      ) : (
                        <StarHalf fill="yellow" />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-10 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Release Date:</strong> {showDetails.release_date}
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Overview:</strong> {showDetails.overview}
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Genres:</strong>{" "}
                      {showDetails.genres
                        .map((genre: { name: string }) => genre.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Duration:</strong> {showDetails.runtime} minutes
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Language:</strong> {showDetails.original_language}
                    </p>
                  </div>
                  {/* <div className={matches ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl" : "p-3 tracking-tight text-xl"}>
                    <p>
                      <strong>Status:</strong> {showDetails.status}
                    </p>
                  </div> */}
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Production Companies:</strong>{" "}
                      {showDetails.production_companies
                        .map((company: { name: string }) => company.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <p>
                      <strong>Production Countries:</strong>{" "}
                      {showDetails.production_countries
                        .map((country: { name: string }) => country.name)
                        .join(", ")}
                    </p>
                  </div>
                  <div
                    className={
                      matches
                        ? "pt-5 text-xl p-5 tracking-tight sm:text-3xl"
                        : "p-3 tracking-tight text-xl"
                    }
                  >
                    <strong>Cast:</strong>
                    <div className="flex flex-row pt-5 w-full">
                      <AnimatedTooltip items={people} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <ul>
            {showDetails.credits.cast.slice(0, 5).map((castMember: { name: string }) => (
              <li key={castMember.name}>{castMember.name}</li>
            ))}
          </ul> */}
          </BackgroundGradient>
        </div>
      )}
      <div className="p-5 text-slate-500 text-sm m-10">
        At JC-Movies, safeguarding intellectual property rights is a cornerstone
        of our operations. We want to unequivocally state that all movies, TV
        shows, episodes, and anime media accessible on our platform are procured
        from third-party providers. Our servers neither host nor store any
        content files. Our mission is to furnish users with a seamless avenue to
        access diverse content sources. We adhere rigorously to the Digital
        Millennium Copyright Act (DMCA) guidelines and promptly address
        legitimate takedown requests. In cases where media may be infringing
        upon DMCA guidelines, we encourage users to address the issue directly
        with the content source, as we are not responsible for the hosting or
        storage of any files. Our dedication is centered on nurturing a
        responsible and compliant ecosystem, ensuring an enriching viewing
        experience for our users. For any inquiries or concerns, please don't
        hesitate to contact us at{" "}
        <span
          className="underline cursor-pointer"
          onClick={() => window.open("mailto:wellyeah17@pm.me")}
        >
          wellyeah17@pm.me
        </span>
      </div>
    </div>
  );
};

export default Page;
export const runtime = "edge";
