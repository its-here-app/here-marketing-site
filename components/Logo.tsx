import Image from "next/image";

const Logo = ({
    className="",
    color="black",
    button=false
}) => {

  const logoSrc = `/images/logo/here-logo-lockup_${color}.svg`;

  return (
    button ? (
      <a href="/" className={`${className} block`}>
        <Image
      src={logoSrc}
      alt="Here logo"
      width={60}   
      height={21}  
    />
      </a>
    ) : (
      <Image
      src={logoSrc}
      alt="Here logo"
      width={60}   
      height={21} 
      className={className}
    />
    )
   
  );
};

export default Logo;