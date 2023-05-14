import * as React from "react";
// import ImageFlipper from "./ImageFlipper";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SampleListsCarousel = () => {
  const [position, setPosition] = useState(-300);
  const [increment, setIncrement] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(150);
  const sampleListContainer = useRef(null);
  const carousel = useRef(null);

  /* for dragging */
  const [currentIndex, setCurrentIndex] = useState(0);
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
  useEffect(() => {
    // carousel.current.style.transform = `translate3D(0px, 0px, 0px)`;
  }, [currentIndex]);

  const next = () => {
    let maths = (-sampleLists.length * increment) / 2;
    console.log(maths);
    if (position > maths) {
      setPosition((prevState) => prevState - increment);
    }
    sampleListContainer.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prev = () => {
    if (position < 0) setPosition((prevState) => prevState + increment);
  };


  // const handleDragStart = (event) => {
  //   event.type === 'touchstart' ? setDragStartPoint(event.touches[0].clientX) : setDragStartPoint(event.clientX)
  //   setIsDragging(true);
  // };

  // const handleDrag = (event) => {
  //   if (!isDragging) return;

  //   let currentDragPoint = event.type === "touchmove" ? event.touches[0].clientX : event.clientX
  //   let diff = currentDragPoint - dragStartPoint;
  //   console.log(diff);
  
  //   carousel.current.style.transform = `translateX(${diff}px)`;
  // };

  // const handleDragEnd = () => {
  //   if (!isDragging) return;

  //   setIsDragging(false);

  //   // const threshold = 50;

  //   // if (diff > (-sampleLists.length * increment) / 2) {
  //   //   setCurrentIndex(2);
  //   //   console.log('new position', currentIndex)
  //   // }
  //   // setStartX(diff);
  //   // carousel.current.style.transform = "translate3D(0, 0, 0)";
  // };

  return (
    <section ref={sampleListContainer} className="mx-auto overflow-hidden">
      <div
        ref={carousel}
        // onMouseDown={handleDragStart}
        // onMouseMove={handleDrag}
        // onMouseUp={handleDragEnd}
        // onTouchStart={handleDragStart}
        // onTouchMove={handleDrag}
        // onTouchEnd={handleDragEnd}
        className={`transition-transform duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] flex flex-row gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px]`}
        data-start-x="20"
        style={{
          // transform: `translate3d(${position}px, 0px, 0px)`,
          width: `${carouselWidth}vw`,
          // minWidth: `${250}vw`,
          // gridTemplateColumns: `repeat(${sampleLists.length}, minmax(0, 1fr))`,
        }}
      >
        {sampleLists.map((currentList, index) => {
          return (
            <div key={index} data-fade-in-group="2">
              <div className="w-[80vw] md:w-[40vw] lg:w-[30vw] col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] ">
                <Link className="cursor-none scale(110%)" href="./">
                  <div
                    style={{ backgroundImage: `url(${currentList.img})` }}
                    className="bg-cover bg-center w-full h-full transition-all ease-in duration-[1200ms] flex flex-col items-center justify-center"
                  >
                    <div className="flex wselect-none text-[--neon] w-full h-full flex-col items-center justify-center">
                      <div className="text-[2rem] sm:text-[40%] font-[Crimson] font-italic leading-[100%] translate-y-[20%]">
                        {currentList.title}
                      </div>
                      <div className="text-[2rem] sm:text-[40%] font-[Golos] font-bold leading-[100%]">
                        {currentList.subtitle}
                      </div>
                    </div>
                  </div>
                </Link>
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
