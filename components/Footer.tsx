import Logo from "@/components/Logo";
import EmailInput from "@/components/ui/EmailInput";
import StickerCTA from "@/components/ui/StickerCTA";

const Footer = ({ className = "" }) => {
  return (
    <footer
      className={`${className} w-full text-white bg-black rounded-t-[2.25rem] overflow-hidden relative`}
    >
      <div className="container-lg pt-16 md:pt-20 pb-10 relative">
        <h2 className="text-radio-4 mb-6 md:mb-9">
          Keep up with our new<br></br>features and exclusives
        </h2>
        <EmailInput className="mb-16" />
        <Logo button={true} color="white" className="mb-8" />
        <div className="text-gray-700 flex flex-col md:flex-row md:justify-between">
          <ul className="flex flex-col md:flex-row gap-5 md:gap-10 mb-10 md:mb-0">
            <li>
              <a href="https://www.instagram.com/itshere.app/" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a href="mailto:team@itshere.app">Contact</a>
            </li>
            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScsPPpWZztGYAwZH3V3czQodyYgmy4mQFYhTmdLr33k08Bd1g/viewform?usp=sf_link"
                target="_blank"
              >
                Give us feedback
              </a>
            </li>
          </ul>
          <p>© Here* 2024. All rights reserved</p>
        </div>
        <Logo
          color="blue"
          type="icon"
          className="absolute bottom-[6.5rem] right-[-.5rem] lg:bottom-[55%] lg:right-[3%] rotate-[12deg] !w-[4.375rem] md:!w-[5.625rem]"
        />
        <StickerCTA
          color="green"
          className="scale-0 lg:scale-100 rotate-20 lg:rotate-0 absolute right-[8%] bottom-[22%]"
        />
      </div>
    </footer>
  );
};

export default Footer;
