import Link from "next/link";
import PlaylistCoverOverlay from "./PlaylistCoverOverlay";

const PlaylistCard = ({ className = "", index = 0, playlist = null }) => {
  if (playlist) {
    return (
      <div
        key={index}
        className={`w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] xl:w-[28rem] xl:h-[28rem] bg-gray-100 rounded-2xl mr-[clamp(0.5rem,1.5vw,1.25rem)] transition-all duration-1200 ease-in-out ${className}`}
      >
        <div className="rounded-2xl relative bg-neon w-full h-full transform transition-transform duration-300 hover:scale-103 overflow-hidden">
          <Link
            href={`/${playlist.username}/${playlist.slug.current}`}
            className="z-10 w-full h-full relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-[10%]"
            aria-label={"View playlist"}
          >
            <h3 className="text-crimson-2">{playlist.city}</h3>
            <h4 className="text-golos-2">{playlist.playlistName}</h4>
            <div className="text-body-sm absolute transition-all duration-400 bottom-[8%]">
              by {playlist.username}
            </div>
          </Link>

          {playlist.cover.asset.url && (
            <div>
              <img
                src={playlist.cover.asset.url}
                alt={""}
                className="w-full h-full object-cover absolute top-0 left-0"
                loading="lazy"
              />
              <PlaylistCoverOverlay />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default PlaylistCard;
