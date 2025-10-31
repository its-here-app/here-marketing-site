"use client";

import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import PlaylistCardSm from "@/components/PlaylistCardSm";
import CircleIcon from "@/components/ui/CircleIcon";

/**
 * Fisher-Yates shuffle function
 */
function shuffleArray(array) {
  const shuffled = [...array]; // copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const SimilarPlaylistsCarousel = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    async function fetchPlaylists() {
      const query = `*[_type == "playlist"]{
        _id,
        playlistName,
        city,
        slug,
        username,
        description,
        dateAdded,
        cover{ asset->{url} }
      }`;

      let playlists = await client.fetch(query);
      playlists = shuffleArray(playlists);
      setPlaylists(playlists);
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="my-8 relative text-balance">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-body-lg">Similar playlists</h4>
        <div className="flex gap-2">
          <CircleIcon
            className="swiper-button-prev cursor-pointer hover:bg-neon transition-all duration-200"
            bgColor="gray"
            alt="Swipe left"
            src="/images/icons/icon-arrow-left-black.svg"
          ></CircleIcon>
          <CircleIcon
            className="swiper-button-next cursor-pointer hover:bg-neon transition-all duration-200"
            bgColor="gray"
            alt="Swipe right"
            src="/images/icons/icon-arrow-right-black.svg"
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
