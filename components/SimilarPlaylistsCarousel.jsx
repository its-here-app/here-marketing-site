"use client";

import { useEffect, useState, useRef } from "react";
import { client } from "../sanity/lib/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import PlaylistCardSm from "@/components/PlaylistCardSm";
import CircleIcon from "@/components/ui/CircleIcon";

import { getSimilarPlaylists, getMorePlaylists } from "@/utils/PlaylistUtils";

const SimilarPlaylistsCarousel = ({ currentPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  const [carouselHeader, setCarouselHeader] = useState("...");
  const [showCarouselButtons, setShowCarouselButtons] = useState(true);

  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const swiperRef = useRef(null); // <- store swiper instance

  useEffect(() => {
    async function fetchSimilar() {
      if (!currentPlaylist) return;
      const similar = await getSimilarPlaylists(currentPlaylist);
      if (similar.length >= 3) {
        setCarouselHeader("Similar playlists");
        setPlaylists(similar);
      } else {
        // If no similar playlists found, fetch 6 random playlists
        const morePlaylists = await getMorePlaylists(currentPlaylist);
        setCarouselHeader("More playlists");
        setPlaylists(morePlaylists);
      }
    }

    fetchSimilar();
  }, [currentPlaylist]);

  function updateButtonState(swiper) {
    setIsPrevDisabled(swiper.isBeginning);
    setIsNextDisabled(swiper.isEnd);
  }

  // Listen for window resize
  useEffect(() => {
    function handleResize() {
      if (swiperRef.current) updateButtonState(swiperRef.current);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="my-8 relative text-balance">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-body-lg">{carouselHeader}</h4>
        <div className="flex gap-2">
          <CircleIcon
            className="swiper-button-prev cursor-pointer hover:bg-neon transition-all duration-200"
            bgColor="gray"
            alt="Swipe left"
            src="/images/icons/icon-arrow-left-black.svg"
            disabled={isPrevDisabled}
          ></CircleIcon>
          <CircleIcon
            className="swiper-button-next cursor-pointer hover:bg-neon transition-all duration-200"
            bgColor="gray"
            alt="Swipe right"
            src="/images/icons/icon-arrow-right-black.svg"
            disabled={isNextDisabled}
          ></CircleIcon>
        </div>
      </div>
      <Swiper
        className="rounded-lg"
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = ".swiper-button-prev";
          swiper.params.navigation.nextEl = ".swiper-button-next";
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // store instance
          swiper.on("afterInit", () => updateButtonState(swiper));
          swiper.on("slideChange", () => updateButtonState(swiper));
          swiper.on("update", () => updateButtonState(swiper)); // handles initial resize/layout
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={16}
        slidesPerView={2} // Multiple slides visible
        slidesPerGroup={1}
        loop={false}
        speed={200}
        breakpoints={{
          640: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        }}
      >
        {playlists.map((playlist, index) => (
          <SwiperSlide key={index}>
            <PlaylistCardSm playlist={playlist} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarPlaylistsCarousel;
