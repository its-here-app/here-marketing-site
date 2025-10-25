'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import 'swiper/css';

const STRAPIBASEURL = 'http://localhost:1337';
const fallbackimg = "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_3840,g_auto/f_auto/q_auto/v1/shutterstock_329662223_ss_non-editorial_3_csm8lw?_a=BAVAZGE70";

const PlaylistCarousel = () => {
  const [playlists, setPlaylists] = useState([]);

useEffect(() => {
  async function fetchPlaylists() {
    const res = await fetch(`${STRAPIBASEURL}/api/playlists?populate=*`);
    const data = await res.json();
    setPlaylists(data.data); // set state
  }

  fetchPlaylists();
}, []);



  return (
    <div className="my-8">
        <div className="">
      <Swiper className="!py-8"
      modules={[Autoplay]}
          slidesPerView="auto"
          allowTouchMove={true}
          autoplay={{
            delay: 4000,  
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1200}      
          slidesPerGroup={1} 
          loop={playlists.length > 2} // only loop if enough slides
          centeredSlides={true}
        spaceBetween={0}
        
      >
        {playlists.map((playlist, index) => (
  
            
            <SwiperSlide key={index} className="!w-[clamp(15rem,40vw,28rem)] !h-[clamp(15rem,40vw,28rem)] mr-[clamp(0.5rem,2vw,1.25rem)] last:mr-0">
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
       
                {playlist.cover?.url && (
                     <img
                    src={playlist.cover?.url ? `${STRAPIBASEURL}${playlist.cover.url}` : fallbackimg}
                    alt={""}
                    className="w-full h-full object-cover absolute top-0 left-0"
                    loading="lazy"
                />
                )}
               

            </div>
            </SwiperSlide>

        ))}
      </Swiper>
      </div>
    </div>
  );
};

export default PlaylistCarousel;
