
const StickerCTA = ({
  color = "black", // black or green
  className = "",
}) => {

  return (
    <img src={`/images/stickers/sticker-start-your-playlist_${color}.svg`}
          alt="Start your playlist"    
          className={`${className} w-[16rem] hidden md:block`}></img>

  );
};

export default StickerCTA;
