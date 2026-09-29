const Button = ({
  onClick = null,
  children,
  variant = "primary", // visual style
  type = "button", // HTML button type
  disabled = false,
  className = "",
}) => {

  // --- Variants (visual styles)
  const variantClasses =
    {
      primary: "btn-primary text-inverse hover:bg-neon hover:text-black",
      secondary: "bg-gray-100 text-black hover:bg-neon",
    }[variant] || "";

  // --- Base shared styles
  const baseClasses =
    "rounded-lg pt-2 pb-[.625rem] px-5 transition-all duration-400 cursor-pointer";

  return (
    <button
      type={type}
      onClick={
        onClick
          ? onClick
          : () => {
              window.location.href = "/signin";
            }
      }
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
