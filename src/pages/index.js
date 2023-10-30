import Image from "next/image";
import Head from "next/head";
import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import SVG from "react-inlinesvg";

import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import tile3Before from "/public/graphics/tile3_before.png";
import tile3After from "/public/graphics/tile3_after.png";
import footerGraphic from "/public/graphics/footer-graphic.png";

import Carousel from "../components/Carousel";
import { ModalForm } from "../components/Modal";
import { Footer } from "../components/Footer";

export default function Home() {
  const cursorCircle = useRef(null);
  const ctaSticker = useRef(null);
  const [cursorState, setCursorState] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [carouselData, setCarouselData] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [MousePosition, setMousePosition] = useState({
    left: 800,
    top: 400,
  });

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

  const getCarouselData = async () => {
    // set isloading to false on success
    const res = await fetch("/api/sheets", {
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    let featured = data.lists.filter((list) => list.isFeatured === "yes");
    setCarouselData(featured);
  };

  const flipperAnimationList = [
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

  const registerAnimationListeners = () => {
    const flipperAnimationElement = document.querySelectorAll(".tile-2-inner");
    let current = 0;
    let prev = 0;
    setInterval(() => {
      flipperAnimationElement[prev].classList.remove("active");
      current < flipperAnimationElement.length - 1 ? current++ : (current = 0);
      flipperAnimationElement[current].classList.add("active");
      prev = current;
    }, 850);

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
  };

  useEffect(() => {
    const body = document.querySelector("body");
    registerAnimationListeners();
    // register modal
    Modal.setAppElement("body");
    // get carousel data, handle loading state
    getCarouselData().then(() => {
      setHydrated(true);
      setIsLoading(false);
    });
    // animate in body on load
    // animateBodyFade(body);
    setCursorState("ul-arrow");
    setTimeout(() => {
      setCursorState(null);
      ctaSticker.current.classList.remove("pop-in");
    }, 1000);
  }, []);

  useEffect(() => {
    document.querySelectorAll("[data-cursor-state]").forEach((el, i) => {
      el.addEventListener("mouseover", () => setCursorState(el.dataset.cursorState));
      el.addEventListener("mouseleave", () => setCursorState(null));
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

    // if your scroll position is 1000px from the bottom, fade out the scroll sticker
    if (scrollPosition > document.body.offsetHeight - document.documentElement.clientHeight - 180) {
      console.log("got here");
      ctaSticker.current.classList.add("translate-y-[-100px]");
      store.style.setProperty("--cta-fill", `var(--neon)`);
      store.style.setProperty("--cta-fill-inner", `black`);
    } else {
      store.style.setProperty("--cta-fill-inner", `var(--white)`);
      ctaSticker.current.classList.remove("translate-y-[-100px]");
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
    const manageHoverState = (state) => {
      if (cursorState === state) {
        cursorCircle.current.classList.add(`cursor-${state}`);
      } else {
        cursorCircle.current.classList.remove(`cursor-${state}`);
      }
    };
    const hoverStates = ["ul-arrow", "asterisk", "invert"];
    hoverStates.forEach((state) => {
      manageHoverState(state);
    });
  }, [cursorState]);

  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      id="home-body"
      // set cursorState
      className="overflow-x-hidden font-[Radio] cursor-none flex m-0 p-0 flex-col w-full h-auto transition-bg bg-[--current-bg]"
    >
      <Head>
        <title>Here*</title>
        {/* <link rel="stylesheet" href="https://use.typekit.net/bra8pow.css"/> */}
        {/* <link rel="stylesheet" href="https://use.typekit.net/bju4rfb.css" /> */}
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content="here* — One place for fave spots" />
        <meta name="twitter:title" content="here* — One place for fave spots" />
        <meta itemProp="name" content="here*" />
        <meta name="application-name" content="here*" />
        <meta name="og:site_name" content="here* — One place for fave spots" />
        <meta property="og:image" content="/graphics/share_image.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover and share the best spots with friends and people like you, helping you sort through all the places."
        />
        <meta
          property="og:description"
          content="Discover and share the best spots with friends and people like you, helping you sort through all the places."
        />
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
        className="cursor-none w-[95%] max-w-[980px] mt-[140px] lg:w-[944px] p-6 md:p-10 rounded-xl z-[999] mx-auto my-auto h-auto bg-[--black]"
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <ModalForm isModal={true} />
      </Modal>
      <div ref={cursorCircle} className="circle max-md:hidden"></div>
      {/* cta sticker */}
      <div
        onClick={openModal}
        data-cursor-state="asterisk"
        ref={ctaSticker}
        className={classNames(
          "hover:drop-shadow-2xl z-[2] md:block fixed right-[5%] top-[84%] md:top-[75%] transition-all duration-[500ms] pop-in w-[180px] md:w-[250px] md:h-[200px]",
          {
            "absolute top-0 hidden opacity-0": modalIsOpen,
          }
        )}
      >
        <SVG id="cta-sticker" className="group w-full h-full" src="/stickers/sticker-cta.svg" />
      </div>

      <section
        data-bg="off-white"
        className="w-full flex max-w-[1738px] mx-auto items-center justify-between px-4 md:px-8 py-6 lg:py-8"
      >
        <div className="relative w-[60px] md:w-[80px] h-auto flex  items-center justify-center">
          <SVG
            src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/graphics/logo-lockup.svg`}
            title="Logo"
          />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>

      <section className="h-max max-w-[1738px] mx-auto flex-col flex items-left justify-start w-full px-4 ">
        <div className="flex flex-col font-[Radio] lg:mx-[5vw] leading-105 tracking-6 pt-[4vh] text-[15vw] md:px-[6vw] xxl:px-0 md:text-[10vw] lg:text-[6.5vw] xxl:text-[9rem]">
          <span data-fade-in-group="1" className="whitespace-nowrap md:pl-[10%] ">
            One place —{" "}
          </span>
          <div className="flex md:justify-between w-[95%] ">
            <span data-fade-in-group="1">for&nbsp;</span>
            <span data-fade-in-group="1">fave spots&nbsp;</span>
          </div>
        </div>

        <div className="flex w-full md:w-[365px] flex-col lg:ml-[19vw] xxl:ml-[15%] pt-12 text-6 md:ml-[10vw]">
          <span data-fade-in-group="1" className="font-[Golos] text-[1.3rem] lg:text-[1.5rem]">
          Discover and share the best spots with people like you
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
      </section>

      <section
        data-bg="white"
        className="relative h-max pt-12 flex items-top justify-center w-full"
      >
        {isLoading ? <PlaceholderCarousel /> : <Carousel lists={carouselData} />}
      </section>

      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        <div className="tile">
          <div data-start-y="20" className="tile-image ">
            <div className="w-full h-full relative items-center justify-center aspect-[1/1.23] bg-center bg-cover ">
              <div className="tile-2-outer">
                {flipperAnimationList.map((item, index) => {
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
            </div>
          </div>
          <div data-start-y="40" className="tile-text grid-reverse text-reverse">
            <div className="tile-text-top">
              <div>
                Discover <span className="whitespace-nowrap">new places</span>
              </div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">from your fave people</div>
            </div>
            <div className="tile-text-bottom">
            One place to find their favorites that they’ve been posting about.
            </div>
          </div>
        </div>
      </section>

      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        <div className="tile">
          <div data-start-y="15" className="tile-image">
            <div className="w-[95%] md:w-full h-full items-center">
              <div
                className="relative w-full items-center justify-center aspect-[1/1.23] bg-center bg-cover rounded-[18px]"
                style={{ backgroundImage: `url('/photos/tile1.png')` }}
              >
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
              </div>
            </div>
          </div>
          <div data-start-y="10" className="tile-text">
            <div className="tile-text-top">
              <div>
                <span>Keep your </span>
                <br />
                <span>travel recs</span>
              </div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">with us</div>
            </div>
            <div className="tile-text-bottom">
            Always have your recommendations ready when your friends come to town 
            </div>
          </div>
        </div>
      </section>


      <section data-scroll-visited="false" data-bg="neon" className="section-tile">
        <div className="tile">
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
                </div>
              </div>
            </div>
          </div>
          <div data-start-y="30" className="tile-text">
            <div className="tile-text-top">
              <div>No need to</div>
              <div className="mt-[0vh] md:mt-[5vh] lg:mt-[8vh]">
                <div className="text-left">
                  start <span className="whitespace-nowrap">from scratch</span>
                </div>
              </div>
            </div>
            <div className="tile-text-bottom">
            Upload your notes, instagram, or maps list to create your city playlist*.
            </div>
          </div>
        </div>
      </section>

      <section
        data-bg="off-white"
        className="relative h-auto px-4 md:px-12  lg:mx-auto  w-full xl:w-[1738px] mt-40 flex items-center"
      >
        <div
          className="absolute
              w-[140px] h-[140px]
              z-0
              lg:scale-[1.25] md:scale-[1.2]
              top-[28%] right-[-6%]
              lg:top-[12%] lg:right-[20%]
              md:top-[0px] md:right-[10%]
          "
        >
          <Image alt="none" fill className="pop-in" src={stickerLockupOcean} />
        </div>
        <div className="text-[Radio] tracking-1 md:tracking-3 pb-16 md:pb-40 w-full mx-0 flex flex-col h-full items-between justify-start font-[Radio] leading-105 text-[15vw] md:text-[8.2vw] xxl:text-[168px]">
          <div data-start-y="80" className="w-full flex justify-start">
            <span className="md:w-[50vw] max-w-[900px]">For the spots you love</span>
          </div>
          <div className="px-0 mt-8 md:mt-2 flex justify-start md:justify-end ">
            <div className="flex items-end justify-end md:w-[55vw] xxl:w-[1020px]">
              <span className="md:w-[50vw] max-w-[900px]">and places you’ll go</span>
            </div>
          </div>
          <div
            data-start-y="80"
            className="grid grid-cols-1 md:grid-cols-12  md:gap-8  justify-between w-full pt-12 md:pl-[0]"
          >
            <div className="flex col-span-1 md:col-span-9 pt-12 w-full md:pt-0 items-end h-auto order-1 md:-order-1">
              <div className="flex items-end h-full flex-row text-[1.75rem] px-0 leading-120 md:leading-150 tracking-1 font-[Golos]">
                <div className="flex flex-row">
                  {/* <span className="pr-2">*</span> */}
                  <div className="md:max-w-[355px] lg:max-w-[552px] text-[1.3rem] lg:text-[1.5rem]">
                  Here* lets you uncover new places to explore and save your go-to spots. 
                  </div>
                  {/* <div className="md:max-w-[355px] lg:max-w-[552px] text-[1.3rem] lg:text-[1.5rem]">
                    like music, compile your favorite places into a{" "}
                    <span className="text-[--ocean]">city playlist</span> that captures that time of
                    your life.
                  </div> */}
                </div>
              </div>
            </div>

            <div className="flex justify-self-end max-w-[320px]  col-span-3 w-full h-max relative">
              <Image src={footerGraphic} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section
        data-cursor-state="invert"
        className="overflow-hidden bg-[--black] relative h-[80vh] md:h-[450px]  w-full flex flex-col justify-between items-top"
      >
        <Footer />
      </section>
    </div>
  );
}

export const LoadingDots = () => {
  return (
    <div className="min-h-[400px] flex justify-center transition-all flex-col h-[300px] w-max my-4">
      <div className="flex flex-row items-center h-[24px]">
        <div className="dot dot-one bg-black"></div>
        <div className="dot dot-two bg-black"></div>
        <div className="dot dot-three bg-black"></div>
      </div>
    </div>
  );
};

export const PlaceholderCarousel = () => {
  return (
    <div className="touch-pan-x transition-transform  duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] flex flex-row gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px] w-auto">
      {[...Array(6)].map((e, i) => (
        <div className="w-[80vw] shimmer hover:scale-[1.02] md:w-[40vw] lg:w-[30vw] col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] transition-all">
          <div className="cursor-none scale(110%) select-none bg-cover bg-gray-400 bg-center w-full h-full transition-all ease-in duration-[1200ms] items-center justify-center grid grid-cols-1 grid-rows-3"></div>
        </div>
      ))}
    </div>
  );
};
