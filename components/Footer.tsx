import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";



const Footer = ({
  className = "",
}) => {
 
  return (
    <footer className="container-lg text-white bg-black rounded-t-[2.25rem]">
        <div className="pt-16 md:pt-20 pb-10">
            <h2 className="text-h1 mb-16">Keep up with our new<br></br>features and exclusives</h2>
            <Logo button={true} color="white" className="mb-8" />
            <div className="text-gray-700 flex flex-col md:flex-row md:justify-between">
                <ul className="flex flex-col md:flex-row gap-5 md:gap-10 mb-10 md:mb-0">
                    <li><a href="https://www.instagram.com/itshere.app/" target="_blank">Instagram</a></li>
                    <li><a href="/" target="_blank">Contact</a></li>
                    <li><a href="https://docs.google.com/forms/d/e/1FAIpQLScsPPpWZztGYAwZH3V3czQodyYgmy4mQFYhTmdLr33k08Bd1g/viewform?usp=sf_link" target="_blank">Give us feedback</a></li>
                </ul>
                <p>© Here* 2024. All rights reserved</p>
            </div>
            
        </div>
   </footer>
  );
};

export default Footer;
