import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import arrowSubmit from "/public/graphics/arrow-right.svg";

import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import stickerStartYourPlaylistBlack from "/public/stickers/sticker-start-your-playlist-2.svg";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import EmailForms from "../components/EmailForms";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import LandingStickers from "../components/LandingStickers";
import ListCarousel from "../components/ListCarousel";
import SampleListsCarousel from "../components/Carousel";

export default function Home() {
  useEffect(() => {});

  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  // console.count('re-renders')
  const cursorCircle = useRef(null);

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    let foo = cursorCircle.current;
    console.log(foo);
    hovering ? foo.classList.add("grow") : foo.classList.remove("grow");
  }, [hovering]);

  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="font-[Radio] cursor-none flex m-0 p-0 flex-col w-full h-auto bg-[--off-white]"
    >
      <div ref={cursorCircle} className="circle"></div>
   
      {/* <Cursor MousePosition={MousePosition} /> */}
      {/* header */}
      <section className="w-full flex items-center justify-between px-[1rem] md:px-[2rem] py-[1rem] lg:py-[2rem">
        <div className="flex items-center justify-center">
          <Image alt="none" src={logoLockup} />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>
      {/* /header */}
      {/* hero */}
      <section className="h-max flex-col flex items-left justify-start w-full px-[1rem] lg:px-[3vw] ">
        <div className="flex flex-col font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] lg:text-[8vw] ">
          {/* title */}
          <span className="whitespace-nowrap  xl:pl-[15vw] max-w-[2000px] lg:pl-[4rem]">One place — </span>
          <br />
          <div className="flex  lg:justify-between w-full max-w-[2000px]">
            <span>for&nbsp;</span>
            <span>fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex flex-col lg:ml-[15vw] w-[365px] pt-[1rem] text-[1.5rem] ">
          <span className="font-[Golos]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-black mt-[4rem] leading-[150%] cursor-none w-max rounded-[16px] text-[--white] text-[14px] lg:text-[20px] font-[Golos] px-[18px] py-[10px]"
          >
            Start your playlist
          </button>
        </div>

        {/* /subtitle */}
        {/* <LandingStickers /> */}
      </section>
      {/* /hero */}

      {/* section 2 */}
      <section className="relative h-max pt-[2rem] flex items-top bg-gradient-start justify-center w-full">
        {/* start your playlist sticker (this should probably be a component that uses the scroll height) */}
      {/* <div className="absolute h-[100vh] w-[200px] right-[10vw] ">
          <div className="sticky right-0 top-[35vh]  z-[5] w-full h-[100px]">
          <Image fill alt="none" src={stickerStartYourPlaylistBlack} />
          </div>
      </div> */}
        {/* <ListCarousel /> */}
        <SampleListsCarousel />
        {/* <LandingStickers /> */}
      </section>
      {/* section 2 */}

      <section className="h-[100vh] bg-gradient-end  flex items-center  justify-center w-full">
        <div className="">test</div>
        {/* <LandingStickers /> */}
      </section>

      <section className="h-[100vh] bg-[--white] flex items-center  justify-center w-full">
        <div className="">test</div>
        {/* <LandingStickers /> */}
      </section>

      {/* footer */}
      <section className="relative h-[95vh] lg:h-[80vh] w-full flex flex-col items-top bg-[--black] justify-center">
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <EmailForms
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )}
        />
        <Image
          alt="none"
          className="pop-in absolute right-[5%] bottom-[5%] "
          src={stickerLockupOcean}
        />{" "}
        <Image
          alt="none"
          className="pop-in absolute right-[20%] bottom-[15%] "
          src={stickerStartYourPlaylist}
        />
      </section>
      {/* /footer */}
    </div>
  );
}
