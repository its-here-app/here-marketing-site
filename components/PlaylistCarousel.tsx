'use client';


import { useEffect, useState } from 'react';
import { client } from '../sanity/lib/client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';


//import useEmblaCarousel from 'embla-carousel-react';
//import Autoplay from 'embla-carousel-autoplay';

import Marquee from "react-fast-marquee";

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
      console.log('Playlists:', playlists);
      setPlaylists(playlists);
  }

  fetchPlaylists();
}, []);



  return (
    <div className="my-8 relative">

{/*}
    <div className="embla" ref={emblaRef}>
      <div className="embla__container py-8">
         {playlists.map((playlist, index) => (
            <div key={index} className="embla__slide relative rounded-2xl bg-black transform transition-transform duration-300 hover:scale-102 mr-[clamp(0.5rem,2vw,1.25rem)] flex-shrink-0">
            <a
                href={playlist.slug}
                className="z-10 w-[clamp(15rem,40vw,28rem)] h-[clamp(15rem,40vw,28rem)] relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-8 rounded-2xl"
                aria-label={""}
            >
                <h3 className="text-display-2">{playlist.city}</h3>
                <h4 className="text-display-3">{playlist.playlistName}</h4>
                <div className="text-body-2 absolute bottom-8">by {playlist.username}</div>
            </a>

            {playlist.cover.asset.url && (
                     <img
                    src={playlist.cover.asset.url}
                    alt={""}
                    className="w-full h-full object-cover absolute top-0 left-0 rounded-2xl"
                    loading="lazy"
                />
                )}

            </div>

        ))}
      </div>
    </div>   */}

    <Marquee className="py-8" pauseOnHover={true} speed={25}>
        {playlists.map((playlist, index) => (
            
            <div key={index} className="w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] xl:w-[28rem] xl:h-[28rem] bg-gray-100 rounded-2xl mr-[clamp(0.5rem,2vw,1.25rem)] transition-all duration-1200 ease-in-out">
                <div className="rounded-2xl relative bg-black w-full h-full transform transition-transform duration-300 hover:scale-102 overflow-hidden">
                    <a
                        href={playlist.slug}
                        className="z-10 w-full h-full relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-[10%]"
                        aria-label={""}
                    >
                        <h3 className="text-display-2">{playlist.city}</h3>
                        <h4 className="text-display-3">{playlist.playlistName}</h4>
                        <div className="text-body-2 absolute transition-all duration-400 bottom-[8%]">by {playlist.username}</div>
                    </a>
        
                    {playlist.cover.asset.url && (
                        <img
                        src={playlist.cover.asset.url}
                        alt={""}
                        className="w-full h-full object-cover absolute top-0 left-0"
                        loading="lazy"
                    />
                    )}
                </div>
            </div>
        ))}
    </Marquee>
{/*
    <Swiper
    modules={[Autoplay, FreeMode]}
      spaceBetween={0}
      slidesPerView="auto"       // Multiple slides visible
      loop={true} 
      freeMode={true}              // Loop infinitely
      autoplay={{
        delay: 0,                // No delay between slides
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      }}
      speed={10000}               // Adjust scroll speed (ms)
      grabCursor={false}          // Makes it draggable
      style={{ padding: "4rem 0" }}
    >
         {playlists.map((playlist, index) => (
            <SwiperSlide key={index} className="!w-[clamp(15rem,40vw,28rem)] !h-[clamp(15rem,40vw,28rem)] bg-black rounded-2xl mr-[clamp(0.5rem,2vw,1.25rem)] last:mr-0 ">
                <div className="rounded-2xl relative bg-black w-full h-full transform transition-transform duration-300 hover:scale-102 overflow-hidden">
                <a
                    href={playlist.slug}
                    className="z-10 w-full h-full relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-8"
                    aria-label={""}
                >
                    <h3 className="text-display-2">{playlist.city}</h3>
                    <h4 className="text-display-3">{playlist.playlistName}</h4>
                    <div className="text-body-2 absolute bottom-8">by {playlist.username}</div>
                </a>
       
                {playlist.cover.asset.url && (
                     <img
                    src={playlist.cover.asset.url}
                    alt={""}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    loading="lazy"
                />
                )}
            </div>
            </SwiperSlide>
         ))}
     
     
      </Swiper>  */}
          
      <StickerCTA className="absolute right-16 -bottom-4 z-10" />
    </div>
  );
};

export default PlaylistCarousel;


