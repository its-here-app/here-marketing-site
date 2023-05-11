import Image from "next/image";
import Head from "next/head";
import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import arrowSubmit from "/public/graphics/arrow-right.svg";
import { throttle } from "lodash";
import Link from "next/link";

import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import stickerStartYourPlaylistBlack from "/public/stickers/sticker-start-your-playlist-2.svg";
import tile1 from "/public/photos/tile1.png";
import tile2 from "/public/photos/tile2.png";
import tile3 from "/public/photos/tile3.png";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import EmailForms from "../components/EmailForms";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import LandingStickers from "../components/LandingStickers";
import SampleListsCarousel from "../components/Carousel";

export default function Home() {
  useEffect(() => {});

  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  // console.count('re-renders')
  const cursorCircle = useRef(null);

  const cursorRefs = useRef([]);
  // const cursorRef = useRef(null);
  const scrollRefs = useRef([]);
  const scrollRef = useRef(null);

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [scrollPosition, setScrollPosition] = useState(0);

  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    handleScroll();
    // console.log(refs.current)
    // cursorRefs.current.forEach((ref) => {
    //   // ref !== null ?
    //   ref.addEventListener("mouseenter", () => setHovering(true));
    //   ref.addEventListener("mouseleave", () => setHovering(false));
    //   // : null;
    // });
    scrollRefs.current.forEach((ref) => {
      // console.log(ref);
    });
  }, []);
  const easeOutQuint = (t, b, c, d) => {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  };

  // const frictionFactor = 0.2;
  // let test = 0;

  // useEffect(() => {
  //   // console.log(scrollPosition);

  //   const startY = parseInt(scrollRef.current.dataset.startY);
  //   console.log(scrollRef.current)
  //   // const elTop = parseInt(scrollRef.current);
  //   // let x = startY / 2
  //   console.log(startY, scrollPosition)
  //   // scrollRef.current.style.transition = "transform 1s ease-in-out";
  //   // scrollRef.current.style.transform = `translateY(${scrollPosition / 10}px)`
  //   easeEl(scrollPosition, scrollRef.current)
  // }, [scrollPosition]);

  // const throttle = (callback, interval) => {
  //   var now = Date.now();
  //   console.log(now + interval - Date.now())
  //   return function() {
  //     if ((now + interval - Date.now()) < 0) {
  //       callback();
  //       now = Date.now();
  //     }
  //   }
  // }

  const handleScroll = () => {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      setScrollPosition(y);
    });
  };

  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    const ref = cursorCircle.current;
    // console.log(foo);
    hovering ? ref.classList.add("grow") : ref.classList.remove("grow");
  }, [hovering]);

  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="font-[Radio] cursor-none flex m-0 p-0 flex-col w-full h-auto bg-[--off-white]"
    >
      <Head>
        <title>Here*</title>
        {/* <link rel="stylesheet" href="https://use.typekit.net/bra8pow.css"/> */}
        {/* <link rel="stylesheet" href="https://use.typekit.net/bju4rfb.css" /> */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content="Here * | one place for fave spots" />
        <meta name="twitter:title" content="Here * | one place for fave spots" />
        <meta itemProp="name" content="Here * | one place for fave spots" />
        <meta name="application-name" content="Here * | one place for fave spots" />
        <meta name="og:site_name" content="Here * | one place for fave spots" />
        <meta property="og:image" content="/graphics/share_image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Here* is an x y z app to help you x y z! ."
        />
        <meta
          property="og:description"
          content="Here* is an x y z app to help you x y z! ."
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://itshere.app" />
        <link rel="canonical" href="https://itshere.app" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta property="og:image:alt" content="Here*" />
        {/* <meta name="robots" content="index,follow" /> */}
      </Head>
      <div ref={cursorCircle} className="circle"></div>
      <div className="absolute z-[3] top-0 right-[30%] w-[10px] h-[100vh]">
        <div className="pop-in absolute top-[50%] w-[300px] h-[200px]">
          <Link
            href=""
            className="cursor-none"
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Image alt="none" className="fixed" fill src={stickerStartYourPlaylistBlack} />
          </Link>
        </div>
      </div>
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
      <section
        data-start-y="-100"
        className="h-max flex-col flex items-left justify-start w-full px-[1rem] md:px-[5vw] "
      >
        <div className="flex flex-col font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:text-[8vw] ">
          {/* title */}
          <span className="whitespace-nowrap xl:pl-[10vw] max-w-[2000px] md:pl-[4rem]">
            One place —{" "}
          </span>
          <br />
          <div className="flex  md:justify-between w-full max-w-[2000px]">
            <span>for&nbsp;</span>
            <span>fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex flex-col lg:ml-[15vw] w-[365px] pt-[1rem] text-[1.5rem] md:ml-[10vw] ">
          <span className="font-[Golos]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            // ref={(ref) => cursorRefs.current.push(ref)}
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="bg-black mt-[1rem] md:mt-[4rem] leading-[150%] cursor-none w-max rounded-[14px] text-[--white] text-[14px] lg:text-[20px] font-[Golos] px-[18px] py-[10px]"
          >
            Start your playlist
          </button>
        </div>

        {/* /subtitle */}
        {/* <LandingStickers /> */}
      </section>
      {/* /hero */}

      {/* section 2 */}
      <section
        ref={scrollRef}
        className="relative h-max pt-[3rem] flex items-top bg-gradient-start justify-center w-full"
      >
        <SampleListsCarousel />
      </section>
      {/* section 2 */}

      <section className="h-max pt-[15vw] bg-[--neon] flex flex-col  items-center justify-center w-full">
        {/* tile */}
        <div className="flex flex-col  mx-[1rem] md:px-[3rem] font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:text-[8vw] ">
          {/* title */}
          <div className="flex  flex-col-reverse  md:grid grid-cols-12  gap-[2rem] justify-items-center w-full ">
            <div className="col-span-6 w-full flex items-center justify-center">
              <div className="w-full h-full  items-center">
                <div
                  className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px] "
                  style={{ backgroundImage: `url('/photos/tile1.png')` }}
                >
                  {/* todo: add scroll watcher to trigger animation */}
                  <div className="absolute flex flex-col items-center justify-center w-full h-full ">
                    <Image
                      className="pop-in py-[2rem]"
                      width="200"
                      height="500"
                      src="/graphics/imessage1.png"
                    />
                    <Image
                      className="pop-in py-[2rem]"
                      width="200"
                      height="500"
                      src="/graphics/imessage1.png"
                    />
                    <Image
                      className="pop-in py-[2rem]"
                      width="200"
                      height="500"
                      src="/graphics/imessage1.png"
                    />
                    {/* <Image className="pop-in" width="200" height="500" src="/graphics/imessage2.png"/> */}
                    {/* <Image className="pop-in" width="200" height="500" src="/graphics/imessage3.png"/> */}
                  </div>
                </div>
              </div>
              {/* /title */}
            </div>
            <div className="col-span-6 flex flex-col justify-between items-between h-full">
              <div className="md:pl-[4vw]">
                <div className="md:pt-[1rem] font-[Radio] leading-[.97] text-[3.8rem] md:text-[7vw]">
                  <div>Stop digging for your</div>
                  <div className="md:mt-[8vh]">travel recs</div>
                </div>
                <div className="font-[Golos] leading-[1.5] max-w-[400px] pt-[2rem] md:pt-[6vh] text-[1.5rem]">
                  One link for anytime you’re asked for your fave city spots
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /tile */}
      </section>

      {/* two-up tiles */}
      <section className="h-[100vh] bg-gradient-end flex items-center  justify-center w-full">
        <div className=""></div>
      </section>
      {/* /two-up tiles */}

      {/* two-up tiles */}
      <section className="h-[100vh] bg-[--white] flex items-center  justify-center w-full"></section>
      {/* /two-up tiles */}

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
