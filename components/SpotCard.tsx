import SpotRating from "@/components/ui/SpotRating";

const SpotCard = ({
  className = "",
  width = "20%",
  imgSrc = "/images/graphics/placeholder.jpg",
  name = "Lorem ipsum",
  rating = "0",
  numReviews = "0",
  ratio = ".8",
}) => {
  return (
    <div
      className={`${className} flex flex-col`}
      style={{ width, aspectRatio: ratio ?? "1 / 1" }}
    >
      <div className="bg-black rounded-2xl mb-3 overflow-hidden h-full">
        <img
          className="w-full h-full object-cover object-center"
          src={imgSrc}
          alt={name}
        />
      </div>
      <h3 className="text-radio-6 mb-1">{name}</h3>
      <SpotRating rating={rating} numReviews={numReviews} />
    </div>
  );
};

export default SpotCard;
