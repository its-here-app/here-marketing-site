import MailChimpForm from "../components/EmailHandler";
import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerInstagramOutline from "/public/stickers/sticker-instagram-outline.svg";
import stickerEmailUs from "/public/stickers/sticker-email-us.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";

export const Footer = ({ isHomepage = true }) => {
  return (
    <div className="relative bg-[--black] pt-12 lg:pt-15 px-4 w-full mx-auto flex flex-col justify-between h-full">
      {/* i removed max-w-[1738px] */}
      <div
        className="
        absolute w-[170px] h-[200px]
        hidden md:block
        scale-[.5]lg:scale-[.8]
        bottom-[30%] md:bottom-[50%] lg:bottom-[55%]
        right-[15%] md:right-[5%] lg:right-[15%]"
      >
        <Image alt="none" fill className="absolute top-0 pop-in" src={stickerLockupOcean} />
      </div>

          {!isHomepage && (<div
            className="hidden md:block absolute
          w-[230px] h-[150px]
          scale-[.8] md:scale-[1] lg:scale-[1.2]
          bottom-[30%] md:bottom-[35%] lg:bottom-[30%]
          right-[10%] lg:right-[10%]"
          >
            <Image
              alt="none"
              id="cta-sticker-footer"
              className="z-30 fade-in scale-[0.95]"
              data-cursor-state="asterisk"
              src={stickerStartYourPlaylist}
              />
          </div>)}
          <div
            className="cursor-pointer 
           absolute block md:hidden
           w-[100px] h-[100px]
           bottom-[20%]
           right-[10%]"
          >
            <Image
              alt="none"
              id="cta-sticker-footer"
              className="z-30 w-full h-full"
              data-cursor-state="asterisk"
              src={stickerEmailUs}
            />
          </div>
          <div
            className="cursor-pointer 
           absolute block md:hidden

           w-[140px] h-[140px]
           bottom-[20%]
           left-[10%]"
          >
            <Image
              alt="none"
              id="cta-sticker-footer"
              className="z-30 w-full h-full"
              data-cursor-state="asterisk"
              src={stickerInstagramOutline}
            />
          </div>
   

      <div className="w-full">
        <div className="md:pl-20 xxl:pl-32">
          <div className="w-full tracking-[-0.03em] font-[Radio] text-white text-[70px] md:text-[80px] lg:text-[90px] xxl:text-[140px] ">
            Try out here*
          </div>
          <div className="relative mt-[1rem] w-full md:w-[600px] lg:w-[800px]  justify-center">
            <MailChimpForm />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex hidden gap-4 h-auto px-4 text-[20px] w-full flex-col text-white">
          <a href="mailto:team@itshere.app">Contact us ↗</a>
          <a href="https://instagram.com/itshere.app" target="blank" className="">
            Follow us on instagram ↗
          </a>
        </div>
        <div className="h-[60px] mb-8 px-4 lg:px-8 flex w-full justify-between">
          <div className="relative flex items-center justify-center h-full w-[40px]">
            <Image alt="none" fill src={logoOG} />
          </div>
          <div className="flex flex-row text-6 w-[65%] ext-[400]  max-w-[600px] h-full items-center md:justify-between justify-end text-white font-[Golos]">
            <a
              href="mailto:team@itshere.app"
              className="cursor-none whitespace-nowrap hidden md:flex"
            >
              Contact us ↗
            </a>
            <a
              href="https://instagram.com/itshere.app"
              target="blank"
              className="cursor=none whitespace-nowrap hidden md:flex"
            >
              Follow us on instagram ↗
            </a>
            <div className="whitespace-nowrap">Here 2023 ©</div>
          </div>
        </div>
      </div>
    </div>
  );
};
