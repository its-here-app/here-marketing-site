import Image from "next/image";
import Head from "next/head";
import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import SVG from "react-inlinesvg";

import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import tile3Before from "/public/graphics/tile3_before.png";
import tile3After from "/public/graphics/tile3_after.png";
import footerGraphic from "/public/graphics/footer-graphic.png";

import MCForm from "../components/EmailHandler";
// import CarouselWrapper from "../components/CarouselWrapper";
import Carousel from "../components/Carousel";

export default function Home() {
  const cursorCircle = useRef(null);
  const ctaSticker = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [hovering, setHovering] = useState(null);
  const [carouselData, setCarouselData] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [MousePosition, setMousePosition] = useState({
    left: 800,
    top: 400,
  });

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

  const openModal = () => {
    setModalOpen(true);
    cursorCircle.current.classList.add("invert");
  };

  const closeModal = () => {
    setModalOpen(false);
    cursorCircle.current.classList.remove("invert");
  };

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
    }, 850);
  };

  const getCarouselData = async () => {
    // set isloading to false on success
    const res = await fetch("/api/sheets");
    const data = await res.json();
    let featured = data.lists.filter((list) => list.isFeatured === "yes");
    setCarouselData(featured);
  };

  useEffect(() => {
    dothing();
    const body = document.querySelector("body");
    var timer = 0;
    // set cursor to arrow on load
    window.addEventListener("scroll", () => {
      handleScroll();
    });
    document.querySelectorAll('[data-fade-in-group="1"]').forEach((el, i) => {
      el.classList.add("fade-in");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });

    document.querySelectorAll("[data-start-y]").forEach((el, i) => {
      el.style.transition = "cubic-bezier(0.22, 1, 0.36, 1) 1800ms";
    });

    Modal.setAppElement("body");

    getCarouselData().then(() => {
      setHydrated(true);
      setIsLoading(false);
    });
    body.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
  }, []);

  useEffect(() => {}, [hydrated]);

  useEffect(() => {
    document.querySelectorAll("[data-cursor-state]").forEach((el, i) => {
      el.addEventListener("mouseover", () => setHovering(el.dataset.cursorState));
      el.addEventListener("mouseleave", () => setHovering(null));
    });
  }, [hydrated]);

  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    const store = document.querySelector(":root");
    const scrollElements = document.querySelectorAll("[data-scroll-visited]");
    const scrollYElements = document.querySelectorAll("[data-start-y]");
    const bgElements = document.querySelectorAll("[data-bg]");
    // const ctaSticker = document.querySelector("#cta-sticker");
    const ctaStickerFooter = document.querySelector("#cta-sticker-footer");

    // if your scroll position is 1000px from the bottom, fade out the scroll sticker
    if (scrollPosition > document.body.offsetHeight - document.documentElement.clientHeight - 400) {
      store.style.setProperty("--cta-fill", `var(--neon)`);
      store.style.setProperty("--cta-fill-inner", `black`);
    } else {
      store.style.setProperty("--cta-fill-inner", `var(--white)`);
      store.style.setProperty("--cta-fill", `var(--black)`);

    }

    scrollYElements.forEach((el, i) => {
      const startY = parseInt(el.dataset.startY);
      const progress = scrollPosition / el.offsetTop;
      if (progress > 0.05 && progress < 1) {
        let pct = startY - progress * startY;
        el.style.transform = `translate(0%, ${pct}%)`;
      }
    });

    bgElements.forEach((el, i) => {
      const color = el.dataset.bg;
      if (scrollPosition > el.offsetTop - el.offsetHeight / 2) {
        store.style.setProperty("--current-bg", `var(--${color})`);
      }
    });

    scrollElements.forEach((el, i) => {
      if (scrollPosition > el.offsetTop - el.offsetHeight / 10) {
        if (el.dataset.scrollVisited == "false") {
          el.dataset.scrollVisited = "true";
          el.querySelector("#animation-container") &&
            el.querySelector("#animation-container").classList.remove("hidden");
          scrollElements[i].classList.add(`active-${i}`);
        }
      }
    });
  }, [scrollPosition]);

  useEffect(() => {
    // if (hovering === "ul-arrow") {
    //   cursorCircle.current.classList.add(`cursor-ul-arrow`);
    // } else {
    //   cursorCircle.current.classList.remove(`cursor-ul-arrow`);
    // }
    // if (hovering === "asterisk") {
    //   cursorCircle.current.classList.add("cursor-asterisk");
    // } else {
    //   cursorCircle.current.classList.remove("cursor-asterisk");
    // }
    // if (hovering === "invert") {
    //   cursorCircle.current.classList.add("cursor-invert");
    // } else {
    //   cursorCircle.current.classList.remove("cursor-invert");
    // }
    const states = {
      "ul-arrow": "cursor-ul-arrow",
      asterisk: "cursor-asterisk",
      invert: "cursor-invert",
    };
    states[hovering]
      ? cursorCircle.current.classList.add(states[hovering])
      : cursorCircle.current.classList.remove(
          "cursor-ul-arrow",
          "cursor-asterisk",
          "cursor-invert"
        );
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
      <Modal
        isOpen={modalIsOpen}
        className="cursor-none w-[95%] md:w-[944px]  mt-[30vh] p-4 md:p-8 rounded-xl z-[999] mx-auto my-auto h-auto bg-[--black]"
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <MCForm isModal={true} />
      </Modal>
      <div ref={cursorCircle} className="circle"></div>
      {/* cta sticker */}
        <div
          onClick={openModal}
          data-cursor-state="asterisk"
          ref={ctaSticker}
          style={{ zIndex: "2"}}
          className="hover:drop-shadow-2xl md:block fixed right-[5%] top-[75%] md:w-[250px] md:h-[200px]"
        >
          <SVG id="cta-sticker" className="group w-full h-full" src="/stickers/sticker-cta.svg" />
        </div>
      {/* cta sticker */}
      {/* <Cursor MousePosition={MousePosition} /> */}
      {/* header */}
      <section
        data-bg="off-white"
        className="w-full flex max-w-[1738px] mx-auto items-center justify-between px-4 md:px-8 py-6 lg:py-8"
      >
        <div className="relative w-[60px] md:w-[80px] h-auto flex  items-center justify-center">
          <SVG
            src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/graphics/logo-lockup.svg`}
            width="auto"
            height="auto"
            title="Logo"
          />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>
      {/* /header */}
      {/* hero */}
      <section className="h-max max-w-[1738px] mx-auto flex-col flex items-left justify-start w-full px-4 ">
        <div className="flex flex-col font-[Radio] lg:mx-[5vw] leading-105 tracking-6 pt-[4vh] text-[15vw] md:px-[6vw] xxl:px-0 md:text-[10vw] lg:text-[6.5vw] xxl:text-[9rem]">
          {/* title */}
          <span data-fade-in-group="1" className="whitespace-nowrap md:pl-[10%] ">
            One place —{" "}
          </span>
          <div className="flex md:justify-between w-[95%] ">
            <span data-fade-in-group="1">for&nbsp;</span>
            <span data-fade-in-group="1">fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex w-full md:w-[365px] flex-col lg:ml-[19vw] xxl:ml-[15%] pt-12 text-6 md:ml-[10vw]">
          <span data-fade-in-group="1" className="font-[Golos] text-[1.3rem] lg:text-[1.5rem]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            data-fade-in-group="1"
            // ref={(ref) => cursorRefs.current.push(ref)}
            data-cursor-state="ul-arrow"
            onClick={openModal}
            className="bg-black mt-8 md:mt-16 leading-150 cursor-none w-max rounded-[14px] text-[--white] text-[14px] lg:text-[20px] font-[Golos] px-[18px] py-[10px]"
          >
            Start your playlist
          </button>
        </div>

        {/* /subtitle */}
        {/* <LandingStickers /> */}
      </section>
      {/* /hero */}

      {/* section 2 */}
      <section data-bg="neon" className="relative h-max pt-12 flex items-top justify-center w-full">
        {isLoading ? (
          <div className="min-h-[400px] flex justify-center transition-all flex-col h-[300px] w-max my-4">
            <div className="flex flex-row items-center h-[24px]">
              <div className="dot dot-one bg-black"></div>
              <div className="dot dot-two bg-black"></div>
              <div className="dot dot-three bg-black"></div>
            </div>
          </div>
        ) : (
          <Carousel lists={carouselData} />
        )}
      </section>
      {/* section 2 */}

      {/* section tile 1 */}
      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        {/* tile */}
        <div className="tile">
          {/* tile-image */}
          <div data-start-y="15" className="tile-image">
            <div className="w-[95%] md:w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile1.png')` }}
              >
                {/* tile animation container */}
                <div
                  id="animation-container"
                  className="hidden absolute flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="aspect-[1/1.5] md:scale-125 w-[80%] md:w-[60%] items-center justify-center flex-col flex">
                    <div className="w-full flex justify-start">
                      <div className="imessage-left pop-in-1 flex flex-col w-max my-4">
                        <span>Do you have recs for LA? </span>
                        <span>I'll be there next week</span>
                      </div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="imessage-right pop-in-2 flex flex-col w-max my-4">Here!</div>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="imessage-right pop-in-3 flex flex-col w-max my-4">
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
                      key={item.title}
                      style={{
                        backgroundImage: `url(/photos/cities/${item.img})`,
                        zIndex: `${item.z}`,
                      }}
                    >
                      <div className="tile-2-text-wrapper">
                        <span className="tile-2-text ">{item.title}</span>
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
              <div>
                Discover <span className="whitespace-nowrap">new places</span>
              </div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">based on what you like</div>
            </div>
            <div className="tile-text-bottom">
              One place to plan, search, cross&#8209;reference and find experiences curated for you.
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
                  id="animation-container"
                  className="hidden pop-in-tile3 absolute flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="absolute pop-out-tile3-before w-[80%] h-[80%]">
                    <Image src={tile3Before} fill alt="" />
                  </div>
                  <div className="absolute pop-in-tile3-after w-[60%] h-[50%]">
                    <Image src={tile3After} fill alt="" />
                  </div>
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
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">
                <div className="text-left">
                  your <span className="whitespace-nowrap">existing lists</span>
                </div>
              </div>
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
        className="relative h-auto px-4 md:px-12  lg:mx-auto  w-full xl:w-[1738px] mt-40 flex items-center"
      >
        <div
          className="absolute
              w-[140px] h-[140px]
              z-[1]
              lg:scale-[1.25] md:scale-[1.2]
              top-[28%] right-[-6%]
              lg:top-[12%] lg:right-[20%]
              md:top-[0px] md:right-[10%]
          "
        >
          <Image alt="none" fill className="pop-in" src={stickerLockupOcean} />
        </div>
        <div className="text-[Radio] tracking-1 md:tracking-3 pb-16 md:pb-40 w-full mx-0 flex flex-col h-full items-between justify-start font-[Radio] leading-105 text-[15vw] md:text-[8.2vw] xxl:text-[168px]">
          {/* title */}
          <div data-start-y="80" className="w-full flex justify-start">
            <span className="md:w-[50vw] max-w-[900px]">For the spots you love</span>
          </div>
          <div className="px-0 mt-8 md:mt-2 flex justify-start md:justify-end ">
            <div className="flex items-end justify-end md:w-[55vw] xxl:w-[1020px]">
              <span className="w-auto ">and those you want to visit</span>
            </div>
          </div>
          <div
            data-start-y="80"
            className="grid grid-cols-1 md:grid-cols-12  md:gap-8  justify-between w-full pt-12 md:pl-[0]"
          >
            <div className="flex col-span-1 md:col-span-9 pt-12 w-full md:pt-0 items-end h-auto order-1 md:-order-1">
              <div className="flex items-end h-full flex-row text-[1.75rem] px-0 leading-120 md:leading-150 tracking-1 font-[Golos]">
                <div className="flex flex-row">
                  <span className="pr-2">*</span>
                  <div className="md:max-w-[355px] lg:max-w-[552px] text-[1.3rem] lg:text-[1.5rem]">
                    like music, compile your favorite places into a{" "}
                    <span className="text-[--ocean]">city playlist</span> that captures that time of
                    your life.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-self-end max-w-[320px]  col-span-3 w-full h-max relative">
              <Image src={footerGraphic} alt="" />
            </div>
          </div>

          {/* /title */}
        </div>
      </section>
      {/* /bottom CTA  */}

      {/* f */}
      <section
        data-cursor-state="invert"
        className="overflow-hidden bg-[--black] relative h-[80vh] md:h-[600px]  w-full flex flex-col justify-between items-top"
      >
        <div className="max-w-[1738px] pt-12 lg:pt-20 px-4 w-full mx-auto flex flex-col justify-between h-full">
          {/* <div className="relative w-full h-[90%] pt-16 md:pt-12 md:h-auto gap-12 flex flex-col md:mx-[6rem]"> */}
          <div className="md:pl-20 xxl:pl-32">
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
            <Image alt="none" fill className="pop-in " src={stickerLockupOcean} />
          </div>
          <div
            onClick={openModal}
            className="cursor-pointer absolute
              w-[230px] h-[150px]
              lg:scale-[1.2]
              bottom-[35%] lg:bottom-[30%]
              right-[10%] lg:right-[10%]
          "
          >
            <Image
              alt="none"
              id="cta-sticker-footer"
              className="z-30 hidden fade-in scale-[0.95]"
              data-cursor-state="asterisk"
              src={stickerStartYourPlaylist}
            />
          </div>
          {/* footer stickers */}
          {/* footer nav */}
          <div className="flex flex-col gap-4">
            <div className="flex md:hidden gap-4 h-auto px-4 text-[20px] w-full flex-col text-white">
              <a className="">Contact us ↗</a>
              <a className="">Follow us on instagram ↗</a>
            </div>
            <div className="h-[100px] mb-8 px-4 lg:px-8 flex w-full justify-between">
              <div className="relative flex items-center justify-center h-full w-[60px]">
                <Image alt="none" fill src={logoOG} />
              </div>
              <div className="flex flex-row text-6 w-[85%] ext-[400]  max-w-[900px] h-full items-center md:justify-between justify-end  text-white font-[Golos]">
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

      {/* /footer */}
    </div>
  );
}
