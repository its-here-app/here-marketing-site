"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import PlaylistCard from "@/components/PlaylistCard";
import FadeIn from "@/components/motion/FadeIn";
import { getAllFeaturedPlaylists } from "@/utils/PlaylistUtils";

const PlaylistCarousel = () => {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchPlaylists() {
      const playlists = await getAllFeaturedPlaylists();
      setPlaylists(playlists);
    }

    fetchPlaylists();
  }, []);

  return (
    <div className="my-8 relative text-balance">
      {playlists.length === 0 ? (
        <div className="py-4">
          <div className="h-[15rem] md:h-[20rem] xl:h-[28rem]"></div>
        </div>
      ) : (
        <FadeIn duration={1.4}>
          <Marquee className="py-4" pauseOnHover={false} speed={30}>
            {playlists.map((playlist, index) => (
              <PlaylistCard
                key={index}
                playlistName={playlist.playlistName}
                cover={playlist.cover?.asset?.url}
                city={playlist.city}
                username={playlist.username}
                slug={playlist.slug?.current}
                className=""
              />
            ))}
          </Marquee>
        </FadeIn>
      )}
    </div>
  );
};

export default PlaylistCarousel;
