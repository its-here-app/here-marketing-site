"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import PlaylistCard from "@/components/PlaylistCard";
import StickerCTA from "@/components/ui/StickerCTA";
import SlideIn from "@/components/motion/SlideIn";
import { getAllPlaylists } from "@/utils/PlaylistUtils";
import StartYourPlaylistModal from "@/components/StartYourPlaylistModal";

const PlaylistCarousel = () => {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchPlaylists() {
      const playlists = await getAllPlaylists();
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
        <SlideIn direction="right" stagger="4" duration="1.4">
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
        </SlideIn>
      )}

      <div onClick={() => setOpen(true)}>
        <StickerCTA className="cursor-pointer absolute scale-0 rotate-15 md:rotate-0 md:scale-100 transition-transform duration-200 right-[6%] -bottom-10 z-10 hover:rotate-10" />
      </div>

      <StartYourPlaylistModal
        open={open}
        onClose={() => setOpen(false)}
      ></StartYourPlaylistModal>
    </div>
  );
};

export default PlaylistCarousel;
