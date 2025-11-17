const ProfileImage = ({ size = 28, imgSrc = "" }) => {
  return (
    <div
      className="w-7 h-7 rounded-full overflow-hidden bg-neon"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          className="w-full h-full object-cover object-center"
        ></img>
      )}
    </div>
  );
};

export default ProfileImage;
