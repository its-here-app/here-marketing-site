import stickerDate from "/public/stickers/sticker-date.svg";
import stickerLockup from "/public/stickers/sticker-lockup.svg";
import stickerLogo from "/public/stickers/sticker-logo.svg";
import stickerDonut from "/public/stickers/sticker-donut.svg";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const LandingStickers = () => {

  return (
    <div className="relative w-[50vw] max-w-[900px] aspect-square ">
    <div id="bg" className="absolute w-[30%] h-[30%] top-[0px] left-[45%]">
      <Image fill alt="none" src={stickerLogo} />
    </div>
    <a
      target="_blank"
      href="https:instagram.com/itshere.app"
      // onMouseOver={() => setHovering(true)}
      // onMouseLeave={() => setHovering(false)}
      className="cursor-none absolute w-[50%] h-[50%] top-[25%] left-[45%]"
    >
      <Image fill alt="none" className="spin" src={stickerDonut} />
    </a>
    <div className="absolute w-[60%] h-[60%] bottom-[0px] left-[0px]">
      <Image fill alt="none" src={stickerDate} />
    </div>

    <div className="absolute w-[50%] h-[50%] top-[10%] left-[0px]">
      <Image fill alt="none" src={stickerLockup} />
    </div>
  </div>
  )
}

export default LandingStickers;