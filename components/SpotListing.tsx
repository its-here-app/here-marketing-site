const SpotListing = ({ className = "", index = 0, spot = null }) => {
  if (spot) {
    return (
      <div className="mb-3 last:mb-0 flex gap-4">
        <img
          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          alt=""
          className="bg-gray-100 w-[6.25rem] h-[6.25rem] rounded-lg object-cover object-center"
        ></img>
        <div>
          <h3 className="text-radio-5 mb-1">{spot.name}</h3>
          <p className="text-gray-700 text-body-sm line-clamp-2">
            {spot.description}
          </p>
        </div>
      </div>
    );
  }
};

export default SpotListing;
