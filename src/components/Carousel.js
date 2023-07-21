import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import asterisk from "/public/graphics/asterisk_regular.svg";

import router from "next/router";

export default function Carousel({ lists }) {
  const [carouselWidth, setCarouselWidth] = useState(null);
  const carouselContainer = useRef(null);
  const carousel = useRef(null);

  const [currentPosition, setCurrentPosition] = useState(-300);
  const [dragStartPoint, setDragStartPoint] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    carousel.current.style.transform = `translateX(${-300}px)`;
    setCurrentPosition(-300);
    let timer = 0;
    document.querySelectorAll('[data-fade-in-group="2"]').forEach((el, i) => {
      el.classList.add("fade-in-slide-up");
      el.style.animationDelay = `${(timer += i * 85)}ms`;
    });
    setCarouselWidth(carouselContainer.current.offsetWidth);
  }, []);

  const handleDragStart = (event) => {
    event.preventDefault();
    event.type === "touchstart"
      ? setDragStartPoint(event.touches[0].clientX - currentPosition)
      : setDragStartPoint(event.clientX - currentPosition);
    setIsDragging(true);
  };

  const handleDrag = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    let currentDragPoint = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    let diff = currentDragPoint - dragStartPoint;
    carousel.current.style.transform = `translateX(${diff}px)`;
    setCurrentPosition(diff);
  };

  const handleDragEnd = () => {
    carousel.current.style.transform = `translateX(${currentPosition}px)`;
    if (!isDragging) return;
    setIsDragging(false);
  };

  return (
    <div
      ref={carouselContainer}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      className="touch-pan-x mx-auto overflow-hidden"
    >
      <div
        ref={carousel}
        className={`touch-pan-x transition-transform  duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] flex flex-row gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px]`}
        style={{
          width: `${carouselWidth}px`,
        }}
      >
        {lists &&
          lists.map((currentList, index) => {
            const parsedContent = JSON.parse(currentList.content);
            return (
              <CarouselItem key={index} currentList={currentList} parsedContent={parsedContent} />
            );
          })}
      </div>
      {/* /carousel end */}
    </div>
  );
}

const CarouselItem = ({ index, currentList, parsedContent }) => {
  const handleClick = (slug, username) => {
    const body = document.querySelector("body");
    body.animate(
      [
        {
          opacity: 1,
          // transform: "translateY(0px)",
        },
        {
          opacity: 0,
          // transform: "translateY(30px)",
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    ).onfinish = (event) => {
      router.push(`/${username}/${slug}`, undefined, { shallow: true })
    };
  };
  return (
    <div key={index} data-fade-in-group="2" className="z-2 transition-transform">
      <div className="w-[80vw] hover:scale-[1.02] md:w-[40vw] lg:w-[30vw] col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] transition-all">
        <div
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_GCP_URL}/${currentList.username}_${
              currentList.slug
            }/cover_${"00"}.webp')`,
          }}
          // style={{ backgroundImage: `url('${returnFirstFormatThatExists(currentList.username, currentList.slug, "00")}')` }}
          className="cursor-none scale(110%) select-none bg-cover bg-gray-400 bg-center w-full h-full transition-all ease-in duration-[1200ms] items-center justify-center grid grid-cols-1 grid-rows-3"
        >
          <div className="row-span-1"></div>
          <div
            onClick={() => {
              handleClick(currentList.slug, currentList.username);
            }}
            data-cursor-state="ul-arrow"
            className="cursor-none flex row-span-1 tighten text-[--neon] flex-col justify-center items-center"
          >
            <div className="card-city-name">
              {currentList.city}
            </div>
            <div className="card-playlist-name max-w-[74%]">
              {currentList.playlistName}
            </div>
          </div>
          <div className="text-[--neon] pb-4 font-[Golos] self-end text-[2rem] row-span-1 flex justify-center items-center">
            <div className="flex flex-row pl-[.8rem]">
              {/* <div className="">{parsedContent.length}</div> */}
              {/* amout of items in list */}
              {/* <div className="">{console.log(currentList)}</div> */}
              {/* {currentList} */}
              <div className="">{parsedContent.length}</div>
              <div className="relative w-[18px] ml-[4px] h-auto">
                <Image fill src={asterisk} alt="asterisk" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
