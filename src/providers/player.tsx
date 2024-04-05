"use client";
import React, { useEffect, useRef, useState } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  MediaPlayer,
  MediaProvider,
  Poster,
  Track,
  SeekButton,
  MediaPlayerInstance,
  Menu,
} from "@vidstack/react";
import isoLangs from "./languages/isoLangs";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import {
  SeekBackward10Icon,
  SeekForward10Icon,
  PlaylistIcon,
  QueueListIcon,
} from "@vidstack/react/icons";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/bg-gradient";
import axios from "axios";
function VideoPlayer({
  src,
  details,
  onSeasonChange, // Receive callback for season change event
  onEpisodeChange, // Receive callback for episode change event
  selectedEpisode,
  selectedSeason,
  seasons,
  episodes,
}: {
  src: any;
  details?: any;
  onSeasonChange?: (seasonNumber: string) => void; // Type definition for season change callback
  onEpisodeChange?: (episodeNumber: string) => void; // Type definition for episode change callback
  selectedEpisode?: string;
  selectedSeason?: string;
  seasons?: any[];
  episodes?: any[];
}) {
  const player = useRef<MediaPlayerInstance>(null);
  const strm = src.stream[0] || src.stream;

  const [visible, setVisible] = useState(false);
  const languages = isoLangs;
  const captions = ["en", "ar", "fr", "es", "nl", "de"]

  const handleSeasonChange = (seasonNumber: string) => {
    if (!onSeasonChange) return;
    player.current?.pause();
    onSeasonChange(seasonNumber);
  };
  const handleEpisodeChange = (episodeNumber: string) => {
    if (!onEpisodeChange) return;
    player.current?.pause();
    onEpisodeChange(episodeNumber);
  };
  function convertLanguageCodeToName(code: string): string {
    const language = languages[code];
    return language ? language.name : "Unknown";
  }
  useEffect(() => {
    player.current?.textTracks;
  }, [selectedEpisode, selectedSeason]);
  useEffect(() => {
    const timeChecker = setInterval(() => {
      const currentTime = player.current?.currentTime || 0;
      const duration = player.current?.duration || 0;
      if (duration > 0 && currentTime > duration - 60) {
        player.current?.controls.show();
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, 1000); // Check every second

    return () => clearInterval(timeChecker);
  }, [!visible]);
  function nextEpHandler() {
    if (!episodes) return;
    if (!seasons) return;
    const currentEpisode = Number(selectedEpisode) || 1;
    const currentSeason = Number(selectedSeason) || 1;
    const nextEpisode =
      currentEpisode < episodes.length ? currentEpisode + 1 : 1;
    const nextSeason =
      currentEpisode < episodes.length
        ? currentSeason
        : currentSeason < seasons?.length
        ? currentSeason + 1
        : 1;
    handleEpisodeChange(nextEpisode.toString());
    currentSeason !== nextSeason && handleSeasonChange(nextSeason.toString());
  }

  return (
    <div className="w-full">
      <MediaPlayer
        ref={player}
        load="eager"
        posterLoad="visible"
        className="w-full aspect-video bg-black text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
        title={details?.title}
        poster={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        src={strm.type === "hls" ? strm.playlist : strm.qualities.unknown.url}
        autoPlay
      >
        <MediaProvider />
        {strm.captions && strm.captions.map((caption: any) => (
          <Track
            key={caption}
            label={
              convertLanguageCodeToName(caption.language) || caption.language
            }
            language={caption.language}
            src={caption.url}
            kind="captions"
          />
        ))

        }
        {captions && selectedEpisode &&
          captions.map((caption: any) => (
            <Track
              key={caption}
              label={
                convertLanguageCodeToName(caption) || caption
              }
              language={caption}
              src={
                caption.url ||
                `/api/subtitles?query=${details.title
                  .split("-")[0].trim()
                  .toLowerCase()}&tmdbId=${
                  details?.id
                }&season=${selectedSeason}&episode=${selectedEpisode}&language=${
                  caption
                }`
              }
              kind="captions"
              type={"srt"}
            />
          ))}
        <Poster
          className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
          alt={details?.title || details.name}
        />
        <DefaultVideoLayout
          slots={{
            beforePlayButton: (
              <SeekButton seconds={-10}>
                {/* @ts-ignore */}
                <SeekBackward10Icon className="w-8 h-8" />
              </SeekButton>
            ),
            afterPlayButton: (
              <SeekButton seconds={10}>
                {/* @ts-ignore */}
                <SeekForward10Icon className="w-8 h-8" />
              </SeekButton>
            ),
            topControlsGroupStart: episodes && (
              <div>
                <Menu.Root>
                  <Menu.Button
                    className="vds-menu-button vds-button"
                    aria-label="Seasons"
                  >
                    {/* @ts-ignore */}
                    <PlaylistIcon className="vds-rotate-icon vds-icon" />
                  </Menu.Button>
                  <Menu.Content
                    className="vds-menu-items"
                    placement={"right start"}
                  >
                    <Menu.RadioGroup
                      className="w-full flex flex-col"
                      value={selectedSeason!}
                    >
                      {seasons?.map(({ season_number }) => (
                        <Menu.Radio
                          className={`vds-radio`}
                          value={season_number}
                          onSelect={() =>
                            handleSeasonChange(Number(season_number).toString())
                          }
                          key={season_number}
                        >
                          <CheckCircle className="vds-icon" />
                          <span className="vds-radio-label">
                            Season {season_number}
                          </span>
                        </Menu.Radio>
                      ))}
                    </Menu.RadioGroup>
                  </Menu.Content>
                </Menu.Root>
                <Menu.Root>
                  <Menu.Button
                    className="vds-menu-button vds-button"
                    aria-label="Episodes"
                  >
                    {/* @ts-ignore */}
                    <QueueListIcon className="vds-rotate-icon vds-icon" />
                  </Menu.Button>
                  <Menu.Content
                    className="vds-menu-items"
                    placement={"right start"}
                  >
                    <Menu.RadioGroup
                      className="w-full flex flex-col"
                      value={selectedEpisode!}
                    >
                      {episodes?.map(({ episode_number, name }) => (
                        <Menu.Radio
                          className={`vds-radio`}
                          value={episode_number}
                          onSelect={() => handleEpisodeChange(episode_number)}
                          key={episode_number}
                        >
                          <CheckCircle className="vds-icon" />
                          <span className="vds-radio-label">
                            Episode {episode_number} ({name})
                          </span>
                        </Menu.Radio>
                      ))}
                    </Menu.RadioGroup>
                  </Menu.Content>
                </Menu.Root>
              </div>
            ),
            afterCaptions: visible
              ? episodes && (
                  <div className="absolute bottom-[5rem] right-5 z-10">
                    <BackgroundGradient>
                      <Button
                        className="bg-transparent hover:bg-slate-700/80 rounded-3xl"
                        onClick={nextEpHandler}
                      >
                        Next Episode
                      </Button>
                    </BackgroundGradient>
                  </div>
                )
              : null,
          }}
          icons={defaultLayoutIcons}
          download={
            strm.type === "hls"
              ? false
              : { url: strm.qualities.unknown.url, filename: details?.title }
          }
        />
      </MediaPlayer>
    </div>
  );
}

export { VideoPlayer };
