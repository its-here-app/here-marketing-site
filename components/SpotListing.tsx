"use client";

import Badge from "@/components/ui/Badge";
import SpotRating from "@/components/ui/SpotRating";
import CircleIcon from "@/components/ui/CircleIcon";

const SpotListing = ({ spot = null }) => {
  if (spot) {
    return (
      <div className="flex gap-4 text-balance">
        <img
          src="/images/graphics/placeholder.jpg"
          alt=""
          className="bg-gray-100 w-[6.25rem] h-[6.25rem] rounded-lg object-cover object-center"
        ></img>
        <div className="grow">
          <h3 className="text-radio-5 mb-1">{spot.name}</h3>
          <p className="text-gray-700 text-body-sm line-clamp-2 mb-2">
            {spot.description}
          </p>
          <div className="flex gap-2">
            <Badge>{spot.type}</Badge>
            <SpotRating rating={spot.ratings} />
          </div>
        </div>
        <div>
          <CircleIcon
            className="cursor-ne-resize hover:bg-neon transition-all duration-200"
            src="/images/icons/icon-map-black.svg"
            alt="Close"
            bgColor="gray"
            size="sm"
            link={`https://www.google.com/maps/place/?q=place_id:${spot.googleMapsUrl}`}
          />
        </div>
      </div>
    );
  }
};

export default SpotListing;
