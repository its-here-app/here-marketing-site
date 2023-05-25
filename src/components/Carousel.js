import * as React from "react";
// import ImageFlipper from "./ImageFlipper";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// import {Slider} from "./Slider";

const SampleListsCarousel = () => {
  const [position, setPosition] = useState(-300);
  const [increment, setIncrement] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(150);
  const sampleListContainer = useRef(null);
  const carousel = useRef(null);

  /* for dragging */
  const [prevPosition, setPrevPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [dragStartPoint, setDragStartPoint] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sampleLists = [
    {
      title: "New York",
      subtitle: "Cute Date Spots",
      amount: "14",
      img: "/lists/nyc.png",
    },
    {
      title: "Chicago",
      subtitle: "All Time Faves",
      amount: "8",
      img: "/lists/chi.png",
    },
    {
      title: "Portland, ME",
      subtitle: "A weekend trip",
      amount: "10",
      img: "/lists/pme.png",
    },
    {
      title: "Portland2",
      subtitle: "test",
      amount: "3",
      img: "/lists/pme.png",
    },
  ];

  useEffect(() => {
    // TODO: allow for dynamic resizing
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
    event.type === 'touchstart' ? setDragStartPoint(event.touches[0].clientX - currentPosition) : setDragStartPoint(event.clientX - currentPosition)
    setIsDragging(true);
    setPrevPosition(currentPosition);
  };

  const handleDrag = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    let currentDragPoint = event.type === "touchmove" ? event.touches[0].clientX : event.clientX
    let diff = currentDragPoint - dragStartPoint;
    carousel.current.style.transform = `translateX(${diff}px)`;
    setCurrentPosition(diff)
  };

  const handleDragEnd = () => {
    if(Math.abs(currentPosition-prevPosition) < 100) {
      console.log('short throw')
      // setCurrentPosition(currentPosition - 500)

    }
    if (!isDragging) return;
    setIsDragging(false);

  };


  return (
    <section ref={sampleListContainer} className="mx-auto overflow-hidden">
      <div
        ref={carousel}
        onMouseDown={handleDragStart}
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDrag}
        onTouchEnd={handleDragEnd}
        className={`transition-transform  duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] flex flex-row gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px]`}
        style={{
          // transform: `translate3d(${position}px, 0px, 0px)`,
          width: `${carouselWidth}vw`,
          // minWidth: `${250}vw`,
          // gridTemplateColumns: `repeat(${sampleLists.length}, minmax(0, 1fr))`,
        }}
      >
        {sampleLists.map((currentList, index) => {
          return (
            <div key={index} data-hover-style="tile" data-fade-in-group="2" className="">
              <div className="w-[80vw] md:w-[40vw] lg:w-[30vw] col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] transition-all">
                <div
                  style={{ backgroundImage: `url(${currentList.img})` }}
                  className="cursor-none scale(110%) select-none bg-cover bg-gray-400 bg-center w-full h-full transition-all ease-in duration-[1200ms] items-center justify-center grid grid-cols-1 grid-rows-3"
                >
                  <div className="row-span-1"></div>
                  <div className="flex row-span-1   text-[--neon] flex-col justify-center items-center">
                    <div className="text-[2rem] sm:text-[40%] font-[Crimson] font-italic leading-[100%] translate-y-[20%]">
                      {currentList.title}
                    </div>
                    <div className="text-[2rem] sm:text-[40%] font-[Golos] font-bold leading-[100%]">
                      {currentList.subtitle}
                    </div>
                  </div>
                  <div className="text-[--neon] pb-[1rem] self-end text-[2rem] sm:text-[40%] row-span-1 flex justify-center items-center">
                    {currentList.amount}*{/* placeholder */}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* /carousel end */}
    </section>
  );
};

export default SampleListsCarousel;
