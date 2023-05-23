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
import imessage1 from "/public/graphics/imessage1.png";
import imessage2 from "/public/graphics/imessage2.png";
import imessage3 from "/public/graphics/imessage3.png";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import EmailForms from "../components/EmailForms";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import LandingStickers from "../components/LandingStickers";
import SampleListsCarousel from "../components/Carousel";

export default function Home() {
  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;
  // console.count('re-renders')
  const cursorCircle = useRef(null);

  const tile2List = [
    {
      title: "New York City",
      img: "newyork.png",
      z: 1,
    },
    {
      title: "Big Island",
      img: "bigisland.png",
      z: -1,
    },
    {
      title: "Los Angeles",
      img: "losangeles.png",
      z: -1,
    },
    {
      title: "San Francisco",
      img: "sanfrancisco.png",
      z: -1,
    },
    {
      title: "Portland",
      img: "portland.png",
      z: -1,
    },
  ];
  const cursorRefs = useRef([]);
  // const cursorRef = useRef(null);
  const scrollRefs = useRef([]);
  // const scrollRef = useRef(null);

  const [MousePosition, setMousePosition] = useState({
    left: 800,
    top: 400,
  });

  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollVisited, setScrollVisited] = useState([]);

  const [hovering, setHovering] = useState(null);

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
  }, 1);

  const dothing = (e) => {
    const tile2cities = document.querySelectorAll(".tile-2-inner");
    let current = 0;
    let prev = 0;
    setInterval(() => {
      tile2cities[prev].classList.remove("active");
      current < tile2cities.length - 1 ? current++ : (current = 0);
      tile2cities[current].classList.add("active");
      prev = current;
    }, 500);
  };
  useEffect(() => {
    console.log("mounted");
    dothing();
    var timer = 0;

    window.addEventListener("scroll", () => {
      handleScroll();
    });

    // const ctaSticker = document.querySelector('#cta-sticker')
    // ctaSticker.style.height =`${document.body.scrollHeight}px`

    document.querySelectorAll('[data-fade-in-group="1"]').forEach((el, i) => {
      el.classList.add("fade-in");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });
    document.querySelectorAll('[data-fade-in-group="2"]').forEach((el, i) => {
      el.classList.add("fade-in-slide-up");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });
    document.querySelectorAll("[data-start-y]").forEach((el, i) => {
      el.style.transition = "cubic-bezier(0.22, 1, 0.36, 1) 1800ms";
    });
    document.querySelectorAll("[data-start-x]").forEach((el, i) => {
      el.style.transition = "cubic-bezier(0.22, 1, 0.36, 1) 4000ms";
    });
    document.querySelectorAll("[data-hover-style]").forEach((el, i) => {
      // onMouseOver={() => setHovering(true)}
      // onMouseLeave={() => setHovering(false)}
      el.addEventListener("mouseover", () => setHovering(el.dataset.hoverStyle));
      el.addEventListener("mouseleave", () => setHovering(null));
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
    const store = document.querySelector(":root");
    // store.style.setProperty("--progress", `${percent}%`);
    document.querySelectorAll("[data-start-y]").forEach((el, i) => {
      const startY = parseInt(el.dataset.startY);
      const progress = scrollPosition / el.offsetTop;
      if (progress > 0.05 && progress < 1) {
        // console.log('progress for', i, ' ', progress)
        let pct = startY - progress * startY;
        // console.log(i, pct)
        el.style.transform = `translate(0%, ${pct}%)`;
      }
    });
    document.querySelectorAll("[data-start-x]").forEach((el, i) => {
      const startX = parseInt(el.dataset.startX);
      const progress = scrollPosition / el.offsetTop;
      if (progress > 0.05) {
        // console.log('progress for', i, ' ', progress)
        let pct = startX - progress * startX;
        // console.log(i, pct)
        el.style.transform = `translate(${-Math.abs(pct) / 50}%, 0%)`;
      }
    });
    document.querySelectorAll("[data-bg]").forEach((el, i) => {
      const color = el.dataset.bg;
      if (scrollPosition > el.offsetTop - el.offsetHeight / 2) {
        store.style.setProperty("--current-bg", `var(--${color})`);
      }
    });
    const scrollElements = document.querySelectorAll("[data-scroll-visited]");

    scrollElements.forEach((el, i) => {
      if (scrollPosition > el.offsetTop - el.offsetHeight / 2) {
        if (el.dataset.scrollVisited == "false") {
          el.dataset.scrollVisited = "true";
          document.querySelector("#animation-container").classList.remove("hidden");
          document.querySelector("#animation-container-3").classList.add("pop-in");
          scrollElements[i].classList.add(`active-${i}`);
        }
        // console.log('got here', i)
      }
    });

    // console.log('----')
  }, [scrollPosition]);

  const filterInView = (arr, query) => {
    return arr.filter((el) => el.imageTop < query);
  };

  useEffect(() => {
    const ref = cursorCircle.current;

    if (hovering === "grow") {
      ref.classList.add("grow");
    } else {
      ref.classList.remove("grow");
    }

    if (hovering === "tile") {
      ref.classList.add("cursor-tile");
    } else {
      ref.classList.remove("cursor-tile");
    }
  }, [hovering]);

  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      id="home-body"
      className="font-[Radio] cursor-none flex m-0 p-0 flex-col w-full h-auto transition-bg bg-[--current-bg]"
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

      {/* <Cursor MousePosition={MousePosition} /> */}
      {/* header */}
      <section
        data-bg="off-white"
        className="w-full flex max-w-[1738px] mx-auto items-center justify-between px-[1rem] md:px-[2rem] py-[1.5rem] lg:py-[2rem"
      >
        <div className="relative w-[100px] h-[50px] md:w-[110px] flex  items-center justify-center">
          <Image alt="logo" fill src={logoLockup} />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>
      {/* /header */}
      {/* hero */}
      <section className="h-max max-w-[1738px] mx-auto flex-col flex items-left justify-start w-full px-[1rem] ">
        <div className="flex flex-col font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:px-[6vw] xxl:px-0 md:text-[10vw] lg:text-[7.5vw] xxl:text-[9rem]">
          {/* title */}
          <span data-fade-in-group="1" className="whitespace-nowrap md:pl-[10%] max-w-[2000px]">
            One place —{" "}
          </span>
          <div className="flex md:justify-between w-full ">
            <span data-fade-in-group="1">for&nbsp;</span>
            <span data-fade-in-group="1">fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex w-full md:w-[365px] flex-col lg:ml-[15vw] xxl:ml-[15%] pt-[1rem] text-[1.5rem] md:ml-[10vw] ">
          <span data-fade-in-group="1" className="font-[Golos]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            data-fade-in-group="1"
            // ref={(ref) => cursorRefs.current.push(ref)}
            data-hover-style="grow"
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
        data-bg="neon"
        className="relative h-max pt-[3rem] flex items-top justify-center w-full"
      >
        <SampleListsCarousel />
      </section>
      {/* section 2 */}

      {/* section tile 1 */}
      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="15" className="tile-image">
            <div className="w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile1.png')` }}
              >
                {/* tile animation container */}
                <div
                  id="animation-container"
                  className="hidden absolute flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="aspect-[1/1.5]  w-[80%] md:w-[60%]  items-center justify-center flex-col flex">
                    <div className="w-full flex justify-start">
                      <div className="imessage-left pop-in-1 flex flex-col w-max my-[1rem]">
                        <span>Do you have recs for LA? </span>
                        <span>I'll be there next week</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="imessage-right pop-in-2 flex flex-col w-max my-[1rem]">
                        Here!
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="imessage-right pop-in-3 flex flex-col w-max my-[1rem]">
                        <div className="flex flex-row items-center h-[24px]">
                          <div className="dot dot-one"></div>
                          <div className="dot dot-two"></div>
                          <div className="dot dot-three"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /tile animation container */}
              </div>
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="10" className="tile-text">
            <div className="tile-text-top">
              <div>
                <span>Stop digging </span>
                <br />
                <span> for your</span>
              </div>
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
      {/* /section tile 1  */}

      {/* section tile 2 */}
      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="20" className="tile-image ">
            <div className="w-full h-full relative items-center justify-center aspect-[1/1.23] bg-center bg-cover ">
              {/* todo: add scroll watcher to trigger animation */}
              <div className="tile-2-outer">
                {tile2List.map((item, index) => {
                  return (
                    <div
                      className="tile-2-inner absolute"
                      style={{
                        backgroundImage: `url(/photos/cities/${item.img})`,
                        zIndex: `${item.z}`,
                      }}
                    >
                      <div className="tile-2-text-wrapper">
                        <span className="tile-2-text">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* tile animation */}
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="40" className="tile-text grid-reverse text-reverse">
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
      {/* /section tile 2  */}

      {/* section tile 3 */}
      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="15" className="tile-image">
            <div className="w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile3.png')` }}
              >
                <div
                  id="animation-container-3"
                  className="absolute flex flex-col items-center justify-center w-full h-full"
                >
                  test
                  {/* content here */}
                </div>
              </div>
            </div>
            {/* /title */}
          </div>
          {/* /tile-image */}
          {/* tile-text */}
          <div data-start-y="30" className="tile-text">
            <div className="tile-text-top">
              <div>Auto&#8209;populate from </div>
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
      {/* /section tile 3  */}

      {/* bottom CTA */}
      <section
        data-bg="off-white"
        className="h-[100vh] mx-[1rem] md:mx-0 mt-[10rem] flex items-center "
      >
        <div className="text-[Radio] flex flex-col h-full items-start justify-start font-[Radio] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:text-[8vw] ">
          {/* title */}
          <div data-start-y="30" className="w-full pt-[3rem] flex justify-start">
            <span className="xl:pl-[8vw] md:w-[60%]  md:pl-[2rem]">For the spots you love</span>
          </div>
          <div data-start-y="40" className=" pt-[3rem] flex justify-start md:justify-end ">
            <span className="xl:pl-[8vw] md:w-[60%] md:pl-[2rem]">and those you want to visit</span>
          </div>
          <div
            data-start-y="80"
            className="relative xl:pl-[8vw] flex  md:w-[60%] max-w-[800px] flex-col pt-[3rem] md:pl-[2rem]  "
          >
            <span className="text-[1.7rem] md:text-[1.8rem] leading-[120%] md:leading-[150%] tracking-[.07rem] font-[Golos]">
              * like music, compile your favorite places into a{" "}
              <span className="text-[--ocean]">city playlist</span> that captures that time of your
              life.
            </span>
          </div>

          {/* /title */}
        </div>
      </section>
      {/* /bottom CTA  */}

      {/* footer */}
      <section className="relative h-[60vh] lg:h-[50vh] w-full flex flex-col items-top bg-[--black] justify-start">
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
        <div className="relative overflow-hidden h-[100%] flex justify-between lg:absolute lg:w-[50%] lg:right-0">
          <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%]">
            <Image alt="none" fill className="pop-in " src={stickerLockupOcean} />
          </div>
          <div className="absolute bottom-[30%] left-[10%] w-[40%] h-[40%]">
            <Image alt="none" fill className="pop-in" src={stickerStartYourPlaylist} />
          </div>
        </div>
        <div className="absolute bottom-[10%] left-[5%]">
          <Image alt="none" src={logoOG} />
        </div>
      </section>

      {/* /footer */}
      {/* <div id="cta-sticker" className="absolute z-[3]  top-0 right-[30%] w-[10px] h-[100vh]">
        <div className="pop-in sticky top-[50%] w-[300px] h-[200px]">
          <Link
            href=""
            className="cursor-none"
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Image alt="none" className=" " fill src={stickerStartYourPlaylistBlack} />
          </Link>
        </div>
      </div> */}
    </div>
  );
}
