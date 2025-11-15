import SpotRating from "@/components/ui/SpotRating";
import FadeIn from "@/components/motion/SlideIn";

const SpotCard = ({
  className = "",
  width = "100%",
  imgSrc = "/images/graphics/placeholder.jpg",
  name = "Spot name",
  rating = "0",
  numReviews = "0",
  ratio = ".8",
}) => {
  return (
    <div
      className={`${className} select-none pointer-events-none`}
      style={{ width }}
    >
      <FadeIn stagger="1">
        <div
          className="relative rounded-2xl mb-3 overflow-hidden bg-neon "
          style={{ aspectRatio: ratio ?? "1 / 1" }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={imgSrc}
            alt=""
          />
        </div>
        <h3 className="text-radio-6 mb-1">{name}</h3>
        <SpotRating rating={rating} numReviews={numReviews} />
      </FadeIn>
    </div>
  );
};

export default SpotCard;
