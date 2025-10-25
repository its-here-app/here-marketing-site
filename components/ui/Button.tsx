import React from "react";

const Button = ({
  onClick,
  children,
  variant = "primary", // visual style
  type = "button",     // HTML button type
  disabled = false,
  className = "",
}) => {
  // --- Variants (visual styles)
  const variantClasses = {
    primary: "bg-black text-white",
    secondary: "bg-gray-100 text-black",
  }[variant] || "";

  // --- Base shared styles
  const baseClasses =
    "rounded-lg text-body-2 py-2 px-5";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
