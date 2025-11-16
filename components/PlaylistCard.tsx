import Link from "next/link";
import PlaylistCoverOverlay from "./PlaylistCoverOverlay";

const PlaylistCard = ({
  className = "",
  playlistName,
  cover,
  city = null,
  username = null,
  slug = null,
}) => {
  // Determine if this should be a link or just a div
  const isClickable = username && slug;
  const Wrapper = isClickable ? Link : "div";
  const wrapperProps = isClickable
    ? {
        href: `/${username}/${slug}`,
        "aria-label": "View playlist",
      }
    : {};

  return (
    <div
      className={`w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] xl:w-[28rem] xl:h-[28rem] bg-gray-100 rounded-2xl mr-[clamp(0.5rem,1.5vw,1.25rem)] transition-all duration-1200 ease-in-out ${className}`}
    >
      <div className="rounded-2xl relative w-full h-full transform transition-transform duration-300 hover:scale-103 overflow-hidden">
        <Wrapper
          {...wrapperProps}
          className="z-10 w-full h-full relative bg-center bg-cover flex flex-col justify-center items-center text-center text-neon p-[10%]"
        >
          {city && <h3 className="text-crimson-2">{city}</h3>}
          <h4 className="text-golos-2">{playlistName}</h4>
          {username && (
            <div className="text-body-sm absolute transition-all duration-400 bottom-[8%]">
              by {username}
            </div>
          )}
        </Wrapper>

        {cover && (
          <div>
            <img
              src={cover}
              alt=""
              className="w-full h-full object-cover absolute top-0 left-0"
              loading="lazy"
            />
            <PlaylistCoverOverlay />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistCard;
