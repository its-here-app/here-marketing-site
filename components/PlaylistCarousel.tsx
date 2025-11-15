"use client";

import { useEffect, useState } from "react";
import { client } from "../sanity/lib/client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import SlideIn from "@/components/motion/SlideIn";

/*
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
*/

import Marquee from "react-fast-marquee";

import PlaylistCard from "@/components/PlaylistCard";
import StickerCTA from "@/components/ui/StickerCTA";
import { getAllPlaylists } from "@/utils/PlaylistUtils";

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
      const playlists = await getAllPlaylists();
      setPlaylists(playlists);
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="my-8 relative text-balance">
      {/*
    <div className="embla" ref={emblaRef}>
      <div className="embla__container py-8">
         {playlists.map((playlist, index) => (
           <PlaylistCard playlist={playlist} index={index} className="embla__slide"/>
        ))}
      </div>
    </div>   */}

      {playlists.length === 0 ? (
        <div className="py-4">
          <div className="h-[15rem] md:h-[20rem] xl:h-[28rem]"></div>
        </div>
      ) : (
        <SlideIn direction="right" stagger="3" duration="1.2">
          <Marquee className="py-4" pauseOnHover={false} speed={30}>
            {playlists.map((playlist, index) => (
              <PlaylistCard playlist={playlist} index={index} />
            ))}
          </Marquee>
        </SlideIn>
      )}

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

      <StickerCTA className="absolute scale-0 rotate-15 md:rotate-0 md:scale-100 transition-transform duration-200 right-[6%] -bottom-10 z-10" />
    </div>
  );
};

export default PlaylistCarousel;
