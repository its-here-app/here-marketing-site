import { ReactSVG } from "react-svg";

const OutlineButton = ({
  onClick,
  children,
  color = "neon", // visual style
  type = "button", // HTML button type
  disabled = false,
  className = "",
  iconSrc = "",
}) => {
  // --- Variants (visual styles)
  const variantClasses =
    {
      neon: "border-neon text-neon hover:text-black hover:bg-neon",
      white: "border-white text-white hover:text-black hover:bg-white",
    }[color] || "";

  // --- Base shared styles
  const baseClasses =
    "relative rounded-full p-3 transition-all duration-200 cursor-pointer  border text-body-sm w-full";

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {iconSrc && (
          <ReactSVG
            src={iconSrc}
            width=""
            className="absolute top-[50%] -translate-y-[50%] left-6"
          />
        )}

        {children}
      </button>
    </div>
  );
};

export default OutlineButton;
