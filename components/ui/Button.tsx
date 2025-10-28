const Button = ({
  onClick,
  children,
  variant = "primary", // visual style
  type = "button", // HTML button type
  disabled = false,
  className = "",
}) => {
  // --- Variants (visual styles)
  const variantClasses =
    {
      primary: "bg-black text-white hover:bg-neon hover:text-black",
      secondary: "bg-gray-100 text-black hover:bg-neon",
    }[variant] || "";

  // --- Base shared styles
  const baseClasses =
    "rounded-lg py-2 px-5 transition-all duration-400 cursor-pointer";

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
