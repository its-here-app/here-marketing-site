import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import arrowSubmit from "/public/graphics/arrow-right.svg";
import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import stickerDate from "/public/stickers/sticker-date.svg";
import stickerLockup from "/public/stickers/sticker-lockup.svg";
import stickerLogo from "/public/stickers/sticker-logo.svg";
import stickerDonut from "/public/stickers/sticker-donut.svg";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  useEffect(() => {});

  const cursorCircle = useRef(null);
  
  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    let foo = cursorCircle.current;
    console.log(foo)
    hovering ? foo.classList.add('grow') : foo.classList.remove('grow')
  }, [hovering])

  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="font-[PP-Radio-Grotesk] cursor-none flex m-0 p-0 flex-col w-full h-auto bg-[color:var(--black)]"
    >
      {/* <Cursor MousePosition={MousePosition} /> */}

      <div ref={cursorCircle} className="circle"></div>

      {/* main */}
      <section className="h-[100vh] flex items-center justify-center w-full">
        <div className="relative w-[50vw] max-w-[900px] aspect-square ">
          <div
            id="bg"
            className="absolute w-[30%] h-[30%] top-[0px] left-[45%]"
          >
            <Image fill alt="none" src={stickerLogo} />
          </div>
          <a href="https://instagram.com/itshere.app" onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="cursor-none absolute w-[50%] h-[50%] top-[25%] left-[45%]">
            <Image fill alt="none" className="spin" src={stickerDonut} />
          </a>
          <div className="absolute w-[60%] h-[60%] bottom-[0px] left-[0px]">
            <Image fill alt="none" src={stickerDate} />
          </div>

          <div className="absolute w-[50%] h-[50%] top-[10%] left-[0px]">
            <Image fill alt="none" src={stickerLockup} />
          </div>
        </div>
      </section>
      {/* /main */}
      {/* footer */}

      <section className="h-[800px] w-full flex flex-col items-top bg-[color:var(--black)] justify-center">
        <div className="relative flex flex-col justify-between gap-[5rem] my-[10rem] mx-[5rem]">
          <div className=" w-full font-[Radio] text-white text-[8vw] ">
            Try it out here*
          </div>
          <form className="relative w-[800px] h-[100px]">
            <input className="cursor-none w-full text-[2.5rem] text-white px-[1rem] h-full email-input" placeholder="your email for exclusive access"></input>
            <button className="cursor-none hover:scale-[1.5] transition-all absolute right-[20px] h-full items-top justify-end " type="submit">
              <Image alt="none" src={arrowSubmit}/>
            </button>
          </form>
          <div className="">
            <Image alt="none" src={logoOG}/>
          </div>
          <Image alt="none"  className="pop-in absolute right-0 bottom-0 " src={stickerStartYourPlaylist}/>
          <Image alt="none"  className="pop-in absolute right-[20%] bottom-[20%] "  src={stickerLockupOcean}/>
        </div>
      </section>
      {/* /footer */}
    </div>
  );
}
