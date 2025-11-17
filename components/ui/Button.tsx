import { useModal } from "@/context/ModalContext";

const Button = ({
  onClick = null,
  children,
  variant = "primary", // visual style
  type = "button", // HTML button type
  disabled = false,
  className = "",
}) => {
  const { openModal } = useModal();

  // --- Variants (visual styles)
  const variantClasses =
    {
      primary: "bg-black text-white hover:bg-neon hover:text-black",
      secondary: "bg-gray-100 text-black hover:bg-neon",
    }[variant] || "";

  // --- Base shared styles
  const baseClasses =
    "rounded-lg pt-2 pb-[.625rem] px-5 transition-all duration-400 cursor-pointer";

  return (
    <div>
      <button
        type={type}
        onClick={onClick ? onClick : openModal}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
