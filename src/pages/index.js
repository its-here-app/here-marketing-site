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
  // const scrollRef = useRef(null);

  const [MousePosition, setMousePosition] = useState({
    left: 800,
    top: 400,
  });

  const [scrollPosition, setScrollPosition] = useState(0);

  const [hovering, setHovering] = useState(false);

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };

  const handleScroll = debounce((e) => {
    const y = window.scrollY;
    setScrollPosition(y);
  }, 10);

  useEffect(() => {
    console.log("mounted");

    window.addEventListener("scroll", () => {
      handleScroll();
    });

    var timer = 0;
    // console.log(cursorCircle.current)
    // setHovering(true)
    document.querySelectorAll('[data-fade-in-group="1"]').forEach((el, i) => {
      el.classList.add("fade-in");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });
    document.querySelectorAll('[data-fade-in-group="2"]').forEach((el, i) => {
      el.classList.add("fade-in-slide-up");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });
    document.querySelectorAll("[data-start-y]").forEach((el, i) => {
      el.style.transition = "cubic-bezier(0.22, 1, 0.36, 1) 800ms";
    });
  }, []);

  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    // const store = document.querySelector(":root");
    // store.style.setProperty("--progress", `${percent}%`);
    document.querySelectorAll("[data-start-y]").forEach((el, i) => {
      const startY = parseInt(el.dataset.startY);
      const progress = scrollPosition / (el.offsetTop);
      if (progress > 0.05 && progress < 1) {
        console.log('progress for', i, ' ', progress)
        let pct = startY - progress * startY;
        el.style.transform = `translate(0%, ${pct}%)`;
      }
    });

    console.log('----')
  }, [scrollPosition]);

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
        <meta name="description" content="Here* is an x y z app to help you x y z! ." />
        <meta property="og:description" content="Here* is an x y z app to help you x y z! ." />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://itshere.app" />
        <link rel="canonical" href="https://itshere.app" />
        <meta name="theme-color" content="#FFFFFF" />
        <meta property="og:image:alt" content="Here*" />
        {/* <meta name="robots" content="index,follow" /> */}
      </Head>
      <div ref={cursorCircle} className="circle"></div>
      {/* <div className="absolute z-[3] overflow-hidden top-0 right-[30%] w-[10px] h-[100vh]">
        <div className="pop-in absolute top-[50%] w-[300px] h-[200px]">
          <Link
            href=""
            className="cursor-none"
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Image alt="none" className="fixed " fill src={stickerStartYourPlaylistBlack} />
          </Link>
        </div>
      </div> */}
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
      <section className="h-max max-w-[1738px] mx-auto flex-col flex items-left justify-start w-full px-[1rem] md:px-[5vw] ">
        <div className="flex flex-col font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:text-[8vw] ">
          {/* title */}
          <span
            data-fade-in-group="1"
            className="whitespace-nowrap xl:pl-[10vw] max-w-[2000px] md:pl-[4rem]"
          >
            One place —{" "}
          </span>
          <div className="flex md:justify-between w-full ">
            <span data-fade-in-group="1">for&nbsp;</span>
            <span data-fade-in-group="1">fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex w-full md:w-[365px] flex-col lg:ml-[15vw] pt-[1rem] text-[1.5rem] md:ml-[10vw] ">
          <span data-fade-in-group="1" className="font-[Golos]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            data-fade-in-group="1"
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
        // ref={(ref) => scrollRefs.current.push(ref)}
        className="relative h-max pt-[3rem] flex items-top bg-gradient-start justify-center w-full"
      >
        <SampleListsCarousel />
      </section>
      {/* section 2 */}

      <section className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="10" className="tile-image">
            <div className="w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile1.png')` }}
              >
                {/* todo: add scroll watcher to trigger animation */}
                <div className="absolute flex flex-col items-center justify-center w-full h-full ">
                  {/* <Image
                    className="pop-in py-[2rem]"
                    width="200"
                    height="500"
                    src="/graphics/imessage1.png"
                  /> */}
                  {/* <Image className="pop-in" width="200" height="500" src="/graphics/imessage2.png"/> */}
                  {/* <Image className="pop-in" width="200" height="500" src="/graphics/imessage3.png"/> */}
                </div>
                {/* tile animation */}
              </div>
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="20" className="tile-text">
            <div className="tile-text-top">
              <div>Stop digging for your</div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">travel recs</div>
            </div>
            <div className="tile-text-bottom">
              One link for anytime you’re asked for your fave city spots
            </div>
          </div>
          {/* /tile-text */}
        </div>
        {/* /tile */}
      </section>

      <section className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="20"  className="tile-image ">
            <div className="w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile2.png')` }}
              >
                {/* todo: add scroll watcher to trigger animation */}
                <div className="absolute flex flex-col items-center justify-center w-full h-full "></div>
                {/* tile animation */}
              </div>
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="40"  className="tile-text grid-reverse text-reverse">
            <div className="tile-text-top">
              <div>Discover new places</div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">based on what you like</div>
            </div>
            <div className="tile-text-bottom">
              One place to plan, search, cross-reference and find experiences curated for you.
            </div>
          </div>
          {/* /tile-text */}
        </div>
        {/* /tile */}
      </section>

      <section className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="15" className="tile-image">
            <div className="w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile3.png')` }}
              >
                <div className="absolute flex flex-col items-center justify-center w-full h-full ">
                  test
                </div>
              </div>
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="30" className="tile-text">
            <div className="tile-text-top">
              <div>Auto-populate from </div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">your existing lists</div>
            </div>
            <div className="tile-text-bottom">
              Start your city playlist with notes, google docs, instagram, or maps.
            </div>
          </div>
          {/* /tile-text */}
        </div>
        {/* /tile */}
      </section>

      {/* two-up tiles */}
      <section className="h-[100vh] bg-gradient-end flex items-center justify-center w-full">
        <div className="">test</div>
      </section>
      {/* /two-up tiles */}

      {/* two-up tiles */}
      <section className="h-[100vh] flex items-center  justify-center w-full"></section>
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
          className="overflow-hidden pop-in absolute right-[20%] bottom-[15%] "
          src={stickerStartYourPlaylist}
        />
      </section>
      {/* /footer */}
    </div>
  );
}
