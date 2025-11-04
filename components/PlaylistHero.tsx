"use client";

import CircleIcon from "@/components/ui/CircleIcon";
import { useRouter } from "next/navigation";
import PlaylistCoverOverlay from "./PlaylistCoverOverlay";
import OutlineButton from "@/components/ui/OutlineButton";
import { useState } from "react";

/** Given a date, returns how long ago that date was in weeks or years
 * @param dateString - the date as a string (e.g. "2023-05-12")
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

/** Returns the current page URL
 * @returns URL as a string
 */
const getPageURL = () => {
  if (typeof window !== "undefined") {
    return window.location.href;
  } else {
    console.warn("Window is undefined, cannot get page URL");
    return "";
  }
};

/** Given a string, copies it to the clipboard
 * @param text - input text to copy
 */
const copyToClipboard = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("✅ Copied to clipboard:", text);
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  } else {
    console.warn("Clipboard API not supported");
  }
};

/** Playlist hero component
 * @param playlist - the playlist object
 */
const PlaylistHero = ({ playlist }) => {
  const router = useRouter();
  const [shareIsOpen, setShareIsOpen] = useState(false);

  const toggleShareMenu = () => setShareIsOpen((prev) => !prev);

  const getLink = () => {
    copyToClipboard(getPageURL());
    toggleShareMenu();
  };

  const copyListAsText = () => {
    const listHeader = `${playlist.city} — ${playlist.playlistName} @ ${playlist.username}\n`;
    const spotsJSON = JSON.parse(playlist.content);

    const spotLines = spotsJSON.map(
      (spot) => `* ${spot.name}, ${spot.description} (${spot.type})`
    );

    const fullText = listHeader + spotLines.join("\n") + `\n\n${getPageURL()}`;

    copyToClipboard(fullText);
    toggleShareMenu();
  };

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
          <div className="relative">
            <CircleIcon
              className="cursor-pointer"
              src="/images/icons/icon-share.svg"
              alt="Share"
              bgColor="glass"
              onClick={toggleShareMenu}
            />
            <div
              className={`fixed md:absolute bottom-0 right-0 md:right-0 md:bottom-auto z-10 md:top-13 bg-black text-white p-[clamp(1rem,8vw,3rem)] rounded-t-4xl md:rounded-2xl w-full md:w-[16rem] text-left md:p-4 flex flex-col
           transition-all duration-300 ease-in-out
          ${shareIsOpen ? "opacity-100 translate-y-0 visible" : "md:opacity-0 translate-y-[100%] md:-translate-y-2 invisible"}
        `}
            >
              <h5 className="text-body-md mb-3">Share city playlist</h5>
              <OutlineButton
                className="mb-3"
                iconSrc="/images/icons/icon-link.svg"
                onClick={getLink}
              >
                Get link
              </OutlineButton>
              <OutlineButton
                className="mb-3 md:mb-0"
                iconSrc="/images/icons/icon-copy.svg"
                onClick={copyListAsText}
              >
                Copy list as text
              </OutlineButton>
              <OutlineButton
                className="md:hidden"
                color="white"
                onClick={toggleShareMenu}
              >
                Cancel
              </OutlineButton>
            </div>
          </div>
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
