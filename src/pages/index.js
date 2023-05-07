import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import arrowSubmit from "/public/graphics/arrow-right.svg";

import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import EmailForms from "../components/EmailForms";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import LandingStickers from "../components/LandingStickers";

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
      className="font-[PP-Radio-Grotesk] cursor-none flex m-0 p-0 flex-col w-full h-auto bg-[--background]"
    >
      <div ref={cursorCircle} className="circle"></div>
      {/* <Cursor MousePosition={MousePosition} /> */}
      {/* header */}
      <section className="w-full flex items-center justify-between px-[1rem] md:px-[5rem] py-[1rem]">
        <div className="flex items-center justify-center">
          <Image alt="none" src={logoLockup} />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>
      {/* /header */}
      {/* hero */}
      <section className="h-[50vh] flex-col  flex items-left justify-start w-full px-[1rem] ">
        <div className="font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[16vw]">
          {/* title */}
          <span className="whitespace-nowrap">One place — </span>
          <br />
          <span className="">for fave spots</span>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="font-[Golos] w-[370px] pt-[1rem] text-[1.5rem] ">
          Discover and share favorite spots through city playlists*
        </div>

        {/* /subtitle */}
        {/* <LandingStickers /> */}
      </section>
      {/* /hero */}

      {/* section 2 */}
      <section className="h-[50vh] flex items-center bg-gradient-start justify-center w-full">
        <div className=""></div>
        {/* <LandingStickers /> */}
      </section>
      {/* section 2 */}

      <section className="h-[100vh]  bg-[--neon] text-red-200 flex items-center bg-gradient-start justify-center w-full">
        <div className="">test</div>
        {/* <LandingStickers /> */}
      </section>

      {/* footer */}
      <section className="relative h-[95vh] lg:h-[80vh] w-full flex flex-col items-top bg-[#252525] justify-center">
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
