"use client";

import CircleIcon from "@/components/ui/CircleIcon";
import { useRouter } from "next/navigation";
import PlaylistCoverOverlay from "./PlaylistCoverOverlay";

/** Given a date, returns how long ago that date was in weeks or years
 * @dateString - the date as a string (e.g. "2023-05-12")
 * @returns a string
 */
function timeAgo(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  const msInWeek = 1000 * 60 * 60 * 24 * 7;
  const msInYear = 1000 * 60 * 60 * 24 * 365;

  const diffMs = now - givenDate;

  const yearsAgo = Math.floor(diffMs / msInYear);
  if (yearsAgo >= 1) {
    return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
  }
  const weeksAgo = Math.floor(diffMs / msInWeek);
  return weeksAgo === 1 ? "1 week ago" : `${weeksAgo} weeks ago`;
}

const PlaylistHero = ({ playlist }) => {
  const router = useRouter();

  return (
    <div
      className="relative overflow-hidden md:sticky md:top-2 bg-cover bg-center rounded-2xl h-[28rem] md:h-[calc(100vh_-_1rem)] text-neon flex flex-col justify-center items-center text-center p-[1.2rem] md:p-[1.5rem] text-balance"
      style={{
        backgroundImage: `url(${playlist.cover.asset.url})`,
      }}
    >
      <PlaylistCoverOverlay radial={true} />

      {/* Inner content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Top */}
        <div className="absolute top-0 flex justify-between w-full">
          <CircleIcon
            className="-ml-2 hover:scale-130 transition duration-200"
            src="/images/icons/icon-close.svg"
            alt="Close"
            onClick={() => router.push("/")}
          />
          <CircleIcon
            src="/images/icons/icon-share.svg"
            alt="Share"
            bgColor="glass"
          />
        </div>
        {/* Center */}
        <div className="p-[10%]">
          <h3 className="text-crimson-1">{playlist.city}</h3>
          <h4 className="text-golos-1">{playlist.playlistName}</h4>
        </div>
        {/* Bottom */}
        <div className="text-body-sm absolute transition-all duration-400 bottom-0 flex justify-between w-full">
          <div>{playlist.username}</div>
          <div>Last updated {timeAgo(playlist.dateAdded)}</div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistHero;
