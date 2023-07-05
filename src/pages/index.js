import Image from "next/image";
import Head from "next/head";
import Modal from "react-modal";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import tile3Before from "/public/graphics/tile3_before.png";
import tile3After from "/public/graphics/tile3_after.png";
import footerGraphic from "/public/graphics/footer-graphic.png";

import MCForm from "../components/EmailHandler";
import SampleListsCarousel from "../components/Carousel";

export default function Home() {
  const cursorCircle = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [hovering, setHovering] = useState(null);
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

  useEffect(() => {
    dothing();
    var timer = 0;

    window.addEventListener("scroll", () => {
      handleScroll();
    });

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
    document.querySelectorAll("[data-cursor-state]").forEach((el, i) => {
      el.addEventListener("mouseover", () => setHovering(el.dataset.cursorState));
      el.addEventListener("mouseleave", () => setHovering(null));
    });
    Modal.setAppElement("body");
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
    const scrollElements = document.querySelectorAll("[data-scroll-visited]");
    const scrollYElements = document.querySelectorAll("[data-start-y]");
    const bgElements = document.querySelectorAll("[data-bg]");

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
          console.log("got here", i);
          el.dataset.scrollVisited = "true";
          el.querySelector("#animation-container") &&
            el.querySelector("#animation-container").classList.remove("hidden");
          scrollElements[i].classList.add(`active-${i}`);
        }
      }
    });
  }, [scrollPosition]);

  useEffect(() => {
    const states = {
      "ul-arrow": "cursor-ul-arrow",
      asterisk: "cursor-asterisk",
      invert: "cursor-invert",
    };

    return states[hovering]
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
        className="z-[3] cursor-none w-[95%] md:w-[944px]  mt-[30vh] p-[1rem] md:p-[2rem] rounded-[24px] z-[999] mx-auto my-auto h-auto bg-[--black]"
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <MCForm isModal={true} />
      </Modal>
      <div ref={cursorCircle} className="circle"></div>
      {/* cta sticker */}
      <div
        id="cta-sticker"
        style={{ zIndex: 2 }}
        className="absolute  top-0 right-[300px] pt-[400px] lg:pt-[500px] lg:right-[20%] w-[10px] h-full"
      >
        <div
          data-cursor-state="asterisk"
          className="pop-in hidden hover:drop-shadow-2xl md:block fixed right-[5%] top-[50%] md:w-[250px] md:h-[200px]"
        >
          <div
            href=""
            onClick={openModal}
            className={classNames(modalIsOpen && "hidden", "cursor-none")}
            onMouseOver={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <svg
              viewBox="0 0 264 156"
              fill="none"
              className=" w-full h-full group  hover:rotate-[15deg] transition-all"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipath="url(#clip0_1244_9825)">
                <ellipse
                  cx="132.076"
                  cy="77.9937"
                  rx="124.076"
                  ry="60.994"
                  transform="rotate(-8 132.076 77.9937)"
                  className="fill-black group-hover:fill-[--neon]"
                />
                <path
                  className="fill-white group-hover:fill-black"
                  d="M77.7749 79.122C76.5906 79.2884 75.5779 79.2438 74.7368 78.9882C73.9098 78.7306 73.2412 78.3214 72.7311 77.7604C72.2189 77.1854 71.8388 76.5271 71.5908 75.7856L73.5789 75.5062C73.8251 76.1329 74.2559 76.6403 74.8711 77.0283C75.4844 77.4022 76.3691 77.5079 77.5253 77.3454C78.7096 77.179 79.5732 76.8276 80.1161 76.2912C80.6731 75.7528 80.905 75.1523 80.8118 74.4896C80.7346 73.9398 80.5462 73.5205 80.2469 73.2319C79.9455 72.9292 79.4829 72.7066 78.859 72.5643C78.2473 72.4058 77.425 72.2842 76.3923 72.1993C75.2588 72.1141 74.3168 71.959 73.5663 71.7337C72.8157 71.5085 72.2326 71.1448 71.817 70.6425C71.4013 70.1401 71.1301 69.4378 71.0032 68.5354C70.9002 67.8023 71.0125 67.1179 71.3401 66.4824C71.6799 65.8308 72.2127 65.2742 72.9387 64.8127C73.6646 64.3513 74.5633 64.0452 75.6349 63.8946C76.6923 63.746 77.5983 63.7984 78.3528 64.0518C79.1073 64.3052 79.7236 64.7003 80.2016 65.237C80.6776 65.7596 81.0306 66.3785 81.2605 67.0939L79.2725 67.3733C79.0483 66.8009 78.6748 66.343 78.1521 65.9995C77.6415 65.6399 76.8856 65.5305 75.8846 65.6712C74.8694 65.8138 74.1096 66.1363 73.605 66.6385C73.1126 67.1247 72.908 67.6639 72.9913 68.256C73.1002 69.0315 73.4695 69.5619 74.0991 69.8472C74.7267 70.1185 75.6948 70.3059 77.0034 70.4096C77.9476 70.4782 78.7618 70.5938 79.4461 70.7564C80.1444 70.9171 80.7228 71.1449 81.1812 71.4399C81.6517 71.7189 82.0123 72.0852 82.263 72.5388C82.5278 72.9904 82.7067 73.5476 82.7998 74.2102C82.9069 74.9716 82.7793 75.7012 82.4173 76.3991C82.0674 77.0809 81.5023 77.6636 80.722 78.1471C79.9416 78.6305 78.9593 78.9555 77.7749 79.122ZM89.8612 77.2077L88.0243 64.1376L82.885 64.8598L82.6413 63.1256L94.9078 61.4017L95.1515 63.1359L90.0123 63.8582L91.8492 76.9283L89.8612 77.2077ZM96.1433 76.3248L99.7306 60.7239L101.719 60.4445L109.467 74.4523L107.31 74.7554L105.376 71.2746L99.1157 72.1544L98.2159 76.0335L96.1433 76.3248ZM99.5276 70.3281L104.476 69.6326L101.039 63.128L99.5276 70.3281ZM112.003 74.0958L109.923 59.2915L115.104 58.5632C116.345 58.3889 117.402 58.4416 118.275 58.7215C119.161 58.9852 119.862 59.4258 120.38 60.0431C120.897 60.6463 121.214 61.3709 121.333 62.2169C121.472 63.2038 121.297 64.1126 120.81 64.9431C120.335 65.7575 119.548 66.393 118.447 66.8496L123.212 72.5205L120.865 72.8504L116.495 67.3827L113.153 67.8524L113.991 73.8164L112.003 74.0958ZM112.915 66.1604L115.897 65.7414C117.265 65.5491 118.21 65.1647 118.733 64.588C119.254 63.9972 119.458 63.3 119.345 62.4963C119.232 61.6926 118.845 61.0857 118.183 60.6754C117.52 60.2511 116.504 60.135 115.137 60.3272L112.155 60.7463L112.915 66.1604ZM129.619 71.6201L127.782 58.55L122.643 59.2723L122.399 57.538L134.666 55.8141L134.909 57.5483L129.77 58.2706L131.607 71.3407L129.619 71.6201ZM148.444 68.9744L147.621 63.1161L140.59 54.9815L142.874 54.6605L148.305 60.9279L151.503 53.4478L153.702 53.1387L149.609 62.8367L150.432 68.695L148.444 68.9744ZM163.201 67.1161C162.356 67.2349 161.518 67.2089 160.689 67.0379C159.872 66.8508 159.11 66.4977 158.405 65.9786C157.699 65.4595 157.097 64.7534 156.597 63.8602C156.112 62.9651 155.776 61.8549 155.59 60.5296L155.531 60.1066C155.352 58.8376 155.375 57.7202 155.599 56.7542C155.836 55.7862 156.224 54.9625 156.761 54.2831C157.296 53.5897 157.932 53.0475 158.668 52.6565C159.417 52.2635 160.215 52.0076 161.061 51.8887C161.907 51.7698 162.738 51.7969 163.553 51.9699C164.382 52.1409 165.15 52.486 165.855 53.0051C166.559 53.51 167.151 54.196 167.632 55.0629C168.128 55.9279 168.465 56.9948 168.643 58.2637L168.703 58.6867C168.889 60.0121 168.865 61.1728 168.631 62.169C168.411 63.1632 168.034 64.007 167.499 64.7005C166.964 65.3939 166.322 65.9442 165.574 66.3513C164.838 66.7422 164.047 66.9972 163.201 67.1161ZM162.952 65.3395C163.727 65.2306 164.42 64.9392 165.029 64.4653C165.652 63.9895 166.116 63.2989 166.42 62.3935C166.724 61.4881 166.78 60.3516 166.588 58.984L166.528 58.561C166.346 57.2638 165.987 56.2432 165.451 55.4989C164.913 54.7406 164.279 54.2187 163.549 53.9331C162.832 53.6456 162.087 53.5563 161.311 53.6653C160.55 53.7723 159.857 54.0637 159.234 54.5395C158.611 55.0152 158.145 55.6918 157.837 56.569C157.527 57.4321 157.463 58.5122 157.646 59.8093L157.705 60.2323C157.897 61.6 158.264 62.677 158.806 63.4636C159.348 64.2501 159.984 64.7861 160.714 65.0717C161.445 65.3573 162.19 65.4465 162.952 65.3395ZM178.751 64.9307C177.581 65.0952 176.527 65.0133 175.589 64.6849C174.65 64.3425 173.875 63.7397 173.265 62.8765C172.653 61.9992 172.245 60.8415 172.043 59.4034L170.825 50.7323L172.813 50.4529L174.031 59.124C174.257 60.7313 174.759 61.847 175.537 62.4709C176.315 63.0949 177.303 63.3226 178.501 63.1542C179.7 62.9858 180.587 62.4945 181.163 61.6803C181.738 60.8661 181.913 59.6553 181.687 58.048L180.469 49.3769L182.457 49.0975L183.675 57.7686C183.877 59.2067 183.805 60.4318 183.459 61.4439C183.11 62.4418 182.531 63.2348 181.722 63.823C180.926 64.395 179.935 64.7643 178.751 64.9307ZM188.565 63.3357L186.485 48.5314L191.666 47.8031C192.907 47.6288 193.964 47.6815 194.837 47.9614C195.723 48.2251 196.424 48.6657 196.943 49.283C197.459 49.8862 197.776 50.6108 197.895 51.4568C198.034 52.4437 197.86 53.3525 197.372 54.183C196.897 54.9974 196.11 55.6329 195.009 56.0895L199.774 61.7604L197.427 62.0903L193.057 56.6227L189.715 57.0923L190.553 63.0563L188.565 63.3357ZM189.478 55.4004L192.46 54.9813C193.827 54.789 194.772 54.4046 195.295 53.8279C195.816 53.2371 196.02 52.5399 195.907 51.7362C195.794 50.9325 195.407 50.3256 194.745 49.9153C194.082 49.491 193.066 49.3749 191.699 49.5671L188.717 49.9862L189.478 55.4004Z"
                />
                <path
                  d="M91.606 106.034L89.5254 91.2301L94.6012 90.5167C95.9124 90.3324 97.0117 90.3792 97.899 90.6571C98.7985 90.9189 99.5012 91.3665 100.007 91.9999C100.511 92.6192 100.826 93.373 100.95 94.2612C101.073 95.1354 100.979 95.9466 100.667 96.695C100.355 97.4433 99.8041 98.0743 99.0136 98.588C98.2353 99.0856 97.1905 99.4265 95.8792 99.6108L92.7915 100.045L93.594 105.755L91.606 106.034ZM92.5478 98.3105L95.5298 97.8914C96.9397 97.6933 97.891 97.3008 98.3836 96.7139C98.8904 96.1251 99.0833 95.4007 98.9624 94.5406C98.8416 93.6806 98.4564 93.0374 97.807 92.611C97.1717 92.1827 96.1491 92.0676 94.7391 92.2658L91.7571 92.6849L92.5478 98.3105ZM105.464 104.087L103.384 89.2824L105.372 89.003L107.209 102.073L114.738 101.015L114.981 102.749L105.464 104.087ZM116.474 102.539L120.062 86.9385L122.05 86.6591L129.798 100.667L127.641 100.97L125.707 97.4892L119.447 98.369L118.547 102.248L116.474 102.539ZM119.859 96.5427L124.808 95.8471L121.37 89.3426L119.859 96.5427ZM134.098 100.063L133.275 94.2042L126.244 86.0696L128.528 85.7486L133.959 92.016L137.157 84.5359L139.356 84.2268L135.263 93.9248L136.086 99.7831L134.098 100.063ZM143.756 98.7052L141.675 83.9009L143.663 83.6215L145.5 96.6916L153.029 95.6335L153.273 97.3677L143.756 98.7052ZM156.029 96.9804L153.948 82.176L155.936 81.8966L158.017 96.701L156.029 96.9804ZM167.15 95.633C165.966 95.7995 164.953 95.7549 164.112 95.4993C163.285 95.2417 162.617 94.8324 162.106 94.2715C161.594 93.6964 161.214 93.0382 160.966 92.2966L162.954 92.0172C163.2 92.644 163.631 93.1514 164.246 93.5394C164.86 93.9133 165.744 94.019 166.901 93.8565C168.085 93.69 168.949 93.3386 169.491 92.8022C170.048 92.2639 170.28 91.6634 170.187 91.0007C170.11 90.4508 169.922 90.0316 169.622 89.7429C169.321 89.4402 168.858 89.2177 168.234 89.0753C167.623 88.9169 166.8 88.7952 165.768 88.7103C164.634 88.6252 163.692 88.47 162.942 88.2448C162.191 88.0196 161.608 87.6558 161.192 87.1535C160.777 86.6512 160.505 85.9488 160.379 85.0465C160.276 84.3133 160.388 83.629 160.715 82.9934C161.055 82.3418 161.588 81.7853 162.314 81.3238C163.04 80.8623 163.939 80.5563 165.01 80.4057C166.068 80.2571 166.974 80.3095 167.728 80.5629C168.483 80.8163 169.099 81.2113 169.577 81.748C170.053 82.2706 170.406 82.8896 170.636 83.6049L168.648 83.8843C168.424 83.3119 168.05 82.854 167.527 82.5105C167.017 82.151 166.261 82.0415 165.26 82.1822C164.245 82.3249 163.485 82.6473 162.98 83.1496C162.488 83.6357 162.283 84.1749 162.367 84.7671C162.476 85.5425 162.845 86.073 163.474 86.3583C164.102 86.6295 165.07 86.817 166.379 86.9206C167.323 86.9892 168.137 87.1048 168.821 87.2675C169.52 87.4281 170.098 87.656 170.557 87.951C171.027 88.2299 171.388 88.5962 171.638 89.0498C171.903 89.5015 172.082 90.0586 172.175 90.7213C172.282 91.4827 172.155 92.2123 171.793 92.9102C171.443 93.592 170.878 94.1746 170.097 94.6581C169.317 95.1416 168.335 95.4666 167.15 95.633ZM179.236 93.7187L177.4 80.6486L172.26 81.3709L172.017 79.6367L184.283 77.9127L184.527 79.647L179.388 80.3692L181.224 93.4393L179.236 93.7187Z"
                  className="fill-white group-hover:fill-black"
                />
                <path
                  d="M206.686 89.3135L205.882 82.6028L201.452 86.7907L200.277 85.0562L204.91 81.1467L199.379 78.6655L200.03 76.6745L205.443 79.4791L204.367 72.8065L206.217 72.5465L207.021 79.2572L211.452 75.0693L212.626 76.8038L207.993 80.7133L213.524 83.1945L212.873 85.1855L207.46 82.3809L208.537 89.0535L206.686 89.3135Z"
                  className="fill-white group-hover:fill-black"
                />
                <path
                  d="M62.288 109.606L61.4832 102.896L57.0531 107.084L55.8786 105.349L60.5113 101.44L54.9804 98.9585L55.6314 96.9675L61.0442 99.7721L59.9681 93.0995L61.8182 92.8395L62.623 99.5502L67.0531 95.3622L68.2277 97.0967L63.5949 101.006L69.1258 103.487L68.4749 105.478L63.062 102.674L64.1381 109.346L62.288 109.606Z"
                  className="fill-white group-hover:fill-black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1244_9825">
                  <rect
                    width="248.151"
                    height="121.988"
                    fill="white"
                    transform="translate(0.71875 34.8613) rotate(-8)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      {/* cta sticker */}
      {/* <Cursor MousePosition={MousePosition} /> */}
      {/* header */}
      <section
        data-bg="off-white"
        className="w-full flex max-w-[1738px] mx-auto items-center justify-between px-[1rem] md:px-[2rem] py-[1.5rem] lg:py-[2rem"
      >
        <div className="relative w-[65px] h-[50px] md:w-[110px] flex  items-center justify-center">
          <Image tabIndex="0" alt="logo" fill src={logoLockup} />
        </div>
        <div className="flex items-center justify-center">{/* hamburger menu */}</div>
      </section>
      {/* /header */}
      {/* hero */}
      <section className="h-max max-w-[1738px] mx-auto flex-col flex items-left justify-start w-full px-[1rem] ">
        <div className="flex flex-col font-[Radio] lg:mx-[5vw] leading-[1.05] tracking-[-.06rem] pt-[4vh] text-[15vw] md:px-[6vw] xxl:px-0 md:text-[10vw] lg:text-[6.5vw] xxl:text-[9rem]">
          {/* title */}
          <span data-fade-in-group="1" className="whitespace-nowrap md:pl-[5%] ">
            One place —{" "}
          </span>
          <div className="flex md:justify-between w-full ">
            <span data-fade-in-group="1">for&nbsp;</span>
            <span data-fade-in-group="1">fave spots&nbsp;</span>
          </div>
          {/* /title */}
        </div>
        {/* subtitle */}

        <div className="flex w-full md:w-[365px] flex-col lg:ml-[15vw] xxl:ml-[15%] pt-[3rem] text-[1.5rem] md:ml-[10vw]">
          <span data-fade-in-group="1" className="font-[Golos]">
            Discover and share favorite spots through city playlists*
          </span>
          <button
            data-fade-in-group="1"
            // ref={(ref) => cursorRefs.current.push(ref)}
            data-cursor-state="ul-arrow"
            onClick={openModal}
            className="bg-black mt-[2rem] md:mt-[4rem] leading-[150%] cursor-none w-max rounded-[14px] text-[--white] text-[14px] lg:text-[20px] font-[Golos] px-[18px] py-[10px]"
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
        className="relative h-auto px-[1rem] md:px-[3rem]  lg:mx-auto  w-full xl:w-[1738px] mt-[10rem] flex items-center"
      >
        <div
          className="absolute
              w-[140px] h-[140px]
              z-[1]
              lg:scale-[1.5]
              top-[4%] right-[-15%]
              md:top-[0px] md:right-[10%]
          "
        >
          <Image alt="none" fill className="pop-in " src={stickerLockupOcean} />
        </div>
        <div className="text-[Radio] pb-[4rem] md:pb-[10rem] w-full mx-0 flex flex-col h-full items-between justify-start font-[Radio] leading-[1.05] tracking-[-.06rem] text-[15vw] md:text-[8.2vw] xxl:text-[168px]">
          {/* title */}
          <div data-start-y="80" className="w-full flex justify-start">
            <span className="md:w-[50vw]">For the spots you love</span>
          </div>
          <div className="px-0 mt-[2rem] md:mt-[.5rem] flex justify-start md:justify-end ">
            <div className="flex items-end justify-end md:w-[55vw] xxl:w-[1020px]">
              <span className="w-auto ">and those you want to visit</span>
            </div>
          </div>
          <div
            data-start-y="80"
            className="relative flex flex-col-reverse items-end  md:flex-row justify-between w-full pt-[3rem] md:pl-[0]"
          >
            <div className="flex pt-[3rem] md:pt-0 items-end h-auto lg:h-[323px] w-full md:w-[560px] ">
              <div className="flex h-[200px] flex-row text-[1.75rem] px-[0] leading-[120%] md:leading-[150%] tracking-[-.01em] font-[Golos]">
                <span className="pr-[.5rem]">*</span>
                <span span className="">
                  like music, compile your favorite places into a{" "}
                  <span className="text-[--ocean]">city playlist</span> that captures that time of
                  your life.
                </span>
              </div>
            </div>

            <div className="flex relative h-[285px] w-[233px] lg:h-[330px] lg:w-[264px] ">
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
        <div className="max-w-[1738px] pt-[3rem] lg:pt-[5rem] px-[1rem] w-full mx-auto flex flex-col justify-between h-full">
          {/* <div className="relative w-full h-[90%] pt-[4rem] md:pt-[3rem] md:h-auto gap-[3rem] flex flex-col md:mx-[6rem]"> */}
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
            <Image alt="none" fill className="pop-in " src={stickerLockupOcean} />
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
            <div className="flex md:hidden tgap-[1rem] h-auto px-[1rem] text-[20px] w-full flex-col text-white">
              <a className="">Contact us ↗</a>
              <a className="">Follow us on instagram ↗</a>
            </div>
            <div className="h-[100px] mb-[2rem] px-[1rem] lg:px-[2rem] flex w-full justify-between">
              <div className="relative flex items-center justify-center h-full w-[60px]">
                <Image alt="none" fill src={logoOG} />
              </div>
              <div className="flex flex-row text-[1.5rem] w-[85%] ext-[400]  max-w-[900px] h-full items-center md:justify-between justify-end  text-white font-[Golos]">
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
