
import MCForm from "./EmailHandler";
import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";


export const Footer = () => {
  return (
    <section
    data-cursor-state="invert"
    className="overflow-hidden bg-[--black] relative h-[80vh] md:h-[450px]  w-full flex flex-col justify-between items-top"
  >
    {/* <div className="max-w-[1738px] pt-[3rem] lg:pt-[5rem] px-[1rem] w-full mx-auto flex flex-col justify-between h-full"> */}
    <div className="max-w-[1738px] pt-12 lg:pt-15 px-4 w-full mx-auto flex flex-col justify-between h-full">
      <div className="md:pl-[5rem] xxl:pl-[8rem]">
        <MCForm isModal={false} />
      </div>
      {/* footer stickers */}
      <div
        className="absolute
          w-[170px] h-[200px]
          lg:scale-[.8]
          hidden md:block
          bottom-[55%] lg:bottom-[55%]
          right-[15%] md:right-[5%] lg:right-[15%]
      "
      >
        {/* <Image alt="none" fill className="pop-in " src={stickerLockupOcean} /> */}
      </div>
      <div
        className="absolute
       w-[230px] h-[150px]
       lg:scale-[1.2]
       bottom-[35%] lg:bottom-[30%]
       right-[10%] lg:right-[5%]
      "
      >
        <Image alt="none" className="pop-in" src={stickerStartYourPlaylist} />
      </div>
      {/* footer stickers */}
      {/* footer nav */}
      <div className="flex flex-col gap-[1rem]">
        <div className="flex md:hidden gap-4 h-auto px-4 text-[20px] w-full flex-col text-white">
          <a className="">Contact us ↗</a>
          <a className="">Follow us on instagram ↗</a>
        </div>
        <div className="h-[60px] mb-[2rem] px-[1rem] lg:px-[2rem] flex w-full justify-between">
          <div className="relative flex items-center justify-center h-full w-[60px]">
            <Image alt="none" fill src={logoOG} />
          </div>
          <div className="flex flex-row text-6 w-[65%] ext-[400]  max-w-[600px] h-full items-center justify-between justify-end  text-white font-[Golos]">
            <div className="whitespace-nowrap hidden md:flex">Contact us ↗</div>
            <div className="whitespace-nowrap hidden md:flex">Follow us on instagram ↗</div>
            <div className="whitespace-nowrap">Here 2023 ©</div>
          </div>
        </div>
      </div>
      {/* /footer nav */}
      {/* </div> */}
    </div>
  </section>
  );
};

