const SpotRating = ({ className = "", rating = "", numReviews = null }) => {
  return (
    rating && (
      <div
        className={`${className} text-gray-800 text-body-xs flex items-center gap-1`}
      >
        {rating}{" "}
        <img
          src="/images/icons/icon-rating-star.svg"
          width="12"
          height="12"
          alt="star icon"
        ></img>
        {numReviews && `(${numReviews})`}
      </div>
    )
  );
};

export default SpotRating;
