const StickerCTA = ({
  color = "black", // black or green
  className = "",
}) => {
  return (
    <img
      src={`/images/stickers/sticker-start-your-playlist_${color}.svg`}
      alt="Start your playlist"
      className={`${className} w-[16rem] transition-all duration-400`}
    ></img>
  );
};

export default StickerCTA;
