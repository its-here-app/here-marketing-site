import Link from "next/link";
import PlaylistCoverOverlay from "./PlaylistCoverOverlay";

const PlaylistCardSm = ({ className = "", index = 0, playlist = null }) => {
  if (playlist) {
    return (
      <div
        key={index}
        className={`aspect-square bg-gray-100 rounded-2xl transition-all duration-1200 ease-in-out ${className}`}
      >
        <div className="rounded-lg relative bg-black w-full h-full overflow-hidden">
          <Link
            href={`/${playlist.username}/${playlist.slug.current}`}
            className="z-10 w-full h-full relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-[10%]"
            aria-label={"View playlist"}
          >
            <h3 className="text-crimson-3">{playlist.city}</h3>
            <h4 className="text-golos-3">{playlist.playlistName}</h4>
          </Link>

          {playlist.cover.asset.url && (
            <div>
              <img
                src={playlist.cover.asset.url}
                alt={""}
                className="w-full h-full object-cover absolute top-0 left-0"
                loading="lazy"
              />
              <PlaylistCoverOverlay radial={true} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default PlaylistCardSm;
