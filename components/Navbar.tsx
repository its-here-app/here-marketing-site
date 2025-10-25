import React from "react";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";



const Navbar = ({
  className = "",
}) => {
 
  return (
   <div className="container flex justify-between my-8">
    <a href="/">
        <Logo />
    </a>
    <div>
        <Button variant="primary" className="sm:block hidden">Start for free</Button>
    </div>
   </div>
  );
};

export default Navbar;
