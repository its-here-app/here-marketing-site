const Logo = ({
  className = "",
  color = "black",
  type = "lockup",
  button = false,
}) => {
  // Set the logo source based on type and color
  const logoSrc =
    type === "lockup"
      ? `/images/logo/here-logo-lockup_${color}.svg`
      : `/images/logo/here-logo-icon_${color}.svg`;

  // Default width based on the logo type
  const defaultWidth = type === "lockup" ? "w-[3.75rem]" : "w-[5.625rem]";

  // Combine the provided className with the default width class
  const imgClassName = `${defaultWidth} ${className} transition-all duration-400`;

  const imgProps = {
    src: logoSrc,
    alt: "Here logo",
    className: imgClassName,
  };

  return button ? (
    <a href="/" className="block">
      <img {...imgProps} />
    </a>
  ) : (
    <img {...imgProps} />
  );
};

export default Logo;
