import Image from "next/image";

const StickerCTA = ({
  color = "black", // black or green
  className = "",
}) => {

  return (
    <Image 
          src={`/images/stickers/sticker-start-your-playlist_${color}.svg`}
          alt="Start your playlist"
          width={263}   
          height={153}   
          className={className}
        />
  );
};

export default StickerCTA;
