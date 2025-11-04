const CircleIcon = ({
  className = "",
  size = "md",
  src = "",
  bgColor = "",
  alt = "",
  onClick = null,
  link = "",
  disabled = false,
}) => {
  /* Get color */
  let bgColorClass;
  switch (bgColor) {
    case "black":
      bgColorClass = "bg-black";
      break;
    case "gray":
      bgColorClass = "bg-gray-100";
      break;
    case "glass":
      bgColorClass = "bg-white/25 backdrop-blur-xs";
      break;
    default:
      bgColorClass = "";
  }
  /* Get sizes */
  let circleSize;
  let iconSize;
  switch (size) {
    case "sm":
      circleSize = 32;
      iconSize = 20;
      break;
    default:
      circleSize = 40;
      iconSize = 24;
  }
  const content = (
    <div
      className={`${bgColorClass} ${className}  flex justify-center items-center rounded-full ${
        onClick ? "cursor-pointer" : ""
      } ${disabled ? "!opacity-40 !cursor-default" : ""}`}
      style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
      onClick={onClick}
    >
      <img
        className="select-none"
        src={src}
        alt={alt}
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
      />
    </div>
  );

  // If link is provided, wrap content in <a>
  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
};

export default CircleIcon;
