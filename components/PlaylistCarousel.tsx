"use client";

import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

/*
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
*/

import Marquee from "react-fast-marquee";

import PlaylistCard from "@/components/PlaylistCard";
import StickerCTA from "@/components/ui/StickerCTA";

const PlaylistCarousel = () => {
  const [playlists, setPlaylists] = useState([]);

  // Embla with autoplay plugin, linear easing

  /*
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      draggable: true,
      speed: 3, // higher = slower scroll
      duration: 40000,
      onResize: true
    },
    [
      Autoplay({
        delay: 0,           // no delay between slides
        stopOnInteraction: false,
        speed: 3,           // controls linear scrolling speed
        playOnInit: true,
      }),
    ]
  );
*/

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

      const playlists = await client.fetch(query);
      // console.log("Playlists:", playlists);
      setPlaylists(playlists);
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="my-8 relative">
      {/*
    <div className="embla" ref={emblaRef}>
      <div className="embla__container py-8">
         {playlists.map((playlist, index) => (
           <PlaylistCard playlist={playlist} index={index} className="embla__slide"/>
        ))}
      </div>
    </div>   */}

      <Marquee className="py-8" pauseOnHover={true} speed={25}>
        {playlists.map((playlist, index) => (
          <PlaylistCard playlist={playlist} index={index} />
        ))}
      </Marquee>

      {/*
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={0}
        slidesPerView="auto" // Multiple slides visible
        loop={true}
        freeMode={true} // Loop infinitely
        freeMode={{
          enabled: true, // This enables free-mode
          momentum: false, // Default: true. Enables momentum.
          momentumRatio: 1, // Default: 1. Higher value means more momentum.
          momentumVelocityRatio: 1, // Default: 1. Adjusts momentum based on swipe speed.
          momentumBounce: false, // Default: true. Allows bounce effect at the end.
          momentumBounceRatio: 1, // Default: 1. Higher value means more bounce.
          sticky: false,
        }}
        autoplay={{
          delay: 0, // No delay between slides
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={10000} // Adjust scroll speed (ms)
        grabCursor={false} // Makes it draggable
        style={{ padding: "4rem 0" }}
      >
        {playlists.map((playlist, index) => (
          <SwiperSlide key={index} className="!shrink">
            <PlaylistCard playlist={playlist} index={index} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      <StickerCTA className="absolute hidden md:block right-[6%] -bottom-4 z-10" />
    </div>
  );
};

export default PlaylistCarousel;
