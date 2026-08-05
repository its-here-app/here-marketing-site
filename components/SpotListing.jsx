"use client";

import Badge from "@/components/ui/Badge";
import SpotRating from "@/components/ui/SpotRating";
import CircleIcon from "@/components/ui/CircleIcon";
import { useModal } from "@/context/ModalContext";
import { trackEvent } from "@/utils/analytics";

const SpotListing = ({
  imgUrl = null,
  name = "Unknown",
  description = "",
  type = "",
  ratings = "",
  numReviews = "",
  interactive = false,
}) => {
  const { openModal } = useModal();

  const handleSpotClick = () => {
    trackEvent("playlist_spot_click");
    openModal("playlist_spot_click");
  };

  const handleSaveClick = () => {
    trackEvent("playlist_save_spot_click");
    openModal("playlist_save_spot_click");
  };

  return (
    <div className="flex gap-4 text-balance">
      <div
        onClick={interactive ? handleSpotClick : undefined}
        className={`flex gap-4 grow ${interactive ? "cursor-pointer" : ""}`}
      >
        <div className="bg-gray-100 w-[6.25rem] h-[6.25rem] rounded-lg aspect-square overflow-hidden shrink-0">
          <img
            src={imgUrl ? imgUrl : "/images/graphics/placeholder.jpg"}
            alt=""
            className="w-full h-full object-cover object-center"
          ></img>
        </div>
        <div className="grow">
          <h3 className="text-radio-5 mb-1">{name}</h3>
          <p className="text-gray-700 text-body-sm line-clamp-2 mb-2">
            {description}
          </p>
          <div className="flex gap-2 flex-wrap">
            <Badge>{type}</Badge>
            <SpotRating rating={ratings} numReviews={numReviews} />
          </div>
        </div>
      </div>
      {interactive && (
        <div>
          <CircleIcon
            className="cursor-ne-resize hover:bg-neon transition-all duration-200"
            src="/images/icons/icon-bookmark-black.svg"
            alt="Bookmark"
            bgColor="gray"
            size="sm"
            onClick={handleSaveClick}
            cursorSize="sm"
          />
        </div>
      )}
    </div>
  );
};

export default SpotListing;
