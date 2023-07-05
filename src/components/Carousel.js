import * as React from "react";
// import ImageFlipper from "./ImageFlipper";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import asterisk from "/public/graphics/asterisk_regular.svg";
import { sampleLists } from "../samples";
// import {Slider} from "./Slider";

const SampleListsCarousel = ({ data }) => {
  const [position, setPosition] = useState(-300);
  const [increment, setIncrement] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(null);
  const sampleListContainer = useRef(null);
  const carousel = useRef(null);

  /* for dragging */
  const [prevPosition, setPrevPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(-300);
  const [dragStartPoint, setDragStartPoint] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    carousel.current.style.transform = `translateX(${-300}px)`;
    setCurrentPosition(-300);
    setCarouselWidth(sampleListContainer.current.offsetWidth);
  }, []);

  useEffect(() => {
    setIncrement(carouselWidth / sampleLists.length);
  }, [carouselWidth]);

  const next = () => {
    let maths = (-sampleLists.length * increment) / 2;
    console.log(maths);
    if (position > maths) {
      setPosition((prevState) => prevState - increment);
    }
    // sampleListContainer.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prev = () => {
    if (position < 0) setPosition((prevState) => prevState + increment);
  };
  // handle drag start
  // handle drag
  // handle drag end

  const handleDragStart = (event) => {
    event.preventDefault();
    event.type === "touchstart"
      ? setDragStartPoint(event.touches[0].clientX - currentPosition)
      : setDragStartPoint(event.clientX - currentPosition);
    setIsDragging(true);
    setPrevPosition(currentPosition);
  };

  const handleDrag = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    let currentDragPoint = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
    let diff = currentDragPoint - dragStartPoint;
    const threshold = 100;
    // todo: calculate drag width (might be a function of container width & viewport width?)
    const min = 0;
    const max = -increment * (sampleLists.length - 1);
    if (diff > min + threshold) {
      carousel.current.style.transform = `translateX(${diff}px)`;
      setCurrentPosition(min);
    } else if (diff < max - threshold) {
      carousel.current.style.transform = `translateX(${diff}px)`;
      setCurrentPosition(max);
    } else {
      carousel.current.style.transform = `translateX(${diff}px)`;
      setCurrentPosition(diff);
    }
  };

  const handleDragEnd = () => {
    const threshold_min = 50;
    const threshold_max = 200;
    console.log(currentPosition - prevPosition);
    const diff = currentPosition - prevPosition;
    if (diff > threshold_min && Math.abs(diff) < threshold_max) {
      // console.log(diff, 'is greater than', threshold_min)
      console.log("short throw, left");
      // carousel.current.style.transform = `translateX(${diff + 300}px)`;
      // setCurrentPosition(currentPosition + 300)
    }
    if (diff < -threshold_min && Math.abs(diff) < threshold_max) {
      console.log("short throw, right");
      // carousel.current.style.transform = `translateX(${diff - 300}px)`;
      // setCurrentPosition(currentPosition - 300)
    }

    carousel.current.style.transform = `translateX(${currentPosition}px)`;
    if (!isDragging) return;
    setIsDragging(false);
  };

  return (
    <div ref={sampleListContainer} className="touch-pan-x mx-auto overflow-hidden">
      <div
        ref={carousel}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        className={`touch-pan-x transition-transform  duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] flex flex-row gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px]`}
        style={{
          // transform: `translate3d(${position}px, 0px, 0px)`,
          width: `${carouselWidth}px`,
          // minWidth: `${250}vw`,
          // gridTemplateColumns: `repeat(${sampleLists.length}, minmax(0, 1fr))`,
        }}
      >
        {sampleLists.map((currentList, index) => {
          return (
            <Link
              href={`/${currentList.slug}`}
              key={index}
              data-cursor-state="ul-arrow"
              data-fade-in-group="2"
              className="z-2 transition-transform"
            >
              <div className="w-[80vw] hover:scale-[1.02] md:w-[40vw] lg:w-[30vw] col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] transition-all">
                <div
                  style={{ backgroundImage: `url(${currentList.img})` }}
                  className="cursor-none scale(110%) select-none bg-cover bg-gray-400 bg-center w-full h-full transition-all ease-in duration-[1200ms] items-center justify-center grid grid-cols-1 grid-rows-3"
                >
                  <div className="row-span-1"></div>
                  <div className="flex row-span-1 tighten text-[--neon] flex-col justify-center items-center">
                    <div className="text-[1rem] sm:text-[40%] font-[Crimson] italic translate-y-[20%]">
                      {currentList.title}
                    </div>
                    <div className="text-[2rem] sm:text-[40%] font-[Golos] font-[500] ">
                      {currentList.subtitle}
                    </div>
                  </div>
                  <div className="text-[--neon] pb-[1rem] self-end text-[2rem] sm:text-[40%] row-span-1 flex justify-center items-center">
                    <div className="flex flex-row">
                      <div className="">{currentList.amount}</div>
                      <div className="relative w-[15px] ml-[5px] h-auto">
                        <Image fill src={asterisk} alt="asterisk" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* /carousel end */}
    </div>
  );
};

export default SampleListsCarousel;
