import Image from "next/image";

const Logo = () => {
  return (
   <Image
      src="/images/logo/here-logo-lockup.svg"
      alt="Here logo"
      width={60}   // set desired width
      height={21}   // set desired height
    />
  );
};

export default Logo;