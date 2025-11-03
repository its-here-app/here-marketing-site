import SpotRating from "@/components/ui/SpotRating";
import { motion, useScroll, useTransform } from "motion/react";

const SpotCard = ({
  className = "",
  width = "100%",
  imgSrc = "/images/graphics/placeholder.jpg",
  name = "Lorem ipsum",
  rating = "0",
  numReviews = "0",
  ratio = ".8",
}) => {
  return (
    <motion.div
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
    </motion.div>
  );
};

export default SpotCard;
