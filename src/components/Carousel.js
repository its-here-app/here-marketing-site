import * as React from "react";
// import ImageFlipper from "./ImageFlipper";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SampleListsCarousel = () => {
  const [position, setPosition] = useState(0);
  const [increment, setIncrement] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);

  const sampleListContainer = useRef(null);
  const carousel = useRef(null);
  const maxCarouselWidth = 120;
  const minCarouselWidth = 100;
  const sampleLists = [
    {
      title: "New York",
      subtitle: "Cute Date Spots",
      img: "/lists/nyc.png",
    },
    {
      title: "Chicago",
      subtitle: "All Time Faves",
      img: "/lists/chi.png",
    },
    {
      title: "Portland, ME",
      subtitle: "A weekend trip",
      img: "/lists/pme.png",
    },
  ];

  useEffect(() => {
    if(window.innerWidth > 1000) {
      setCarouselWidth(100)
    } else {
      setCarouselWidth(200)
    }
    // if(sampleLists.length * 50 > maxCarouselWidth) {
    //   setCarouselWidth(maxCarouselWidth)
    // } else if(sampleLists.length * 50 < maxCarouselWidth) {

    // } else {
    //   setCarouselWidth(sampleLists.length * 50);
    // }
    
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
    sampleListContainer.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const prev = () => {
    if (position < 0) setPosition((prevState) => prevState + increment);
  };

  return (
    <section ref={sampleListContainer} className=" mx-auto overflow-hidden">
      {/* arrows TODO: remove */}
      {/* <div className="text-[3rem] lg:px-[12px] pt-[3rem] leading-tight">
        <div className="container mx-auto flex flex-row w-full justify-between">
          <div className="font-sans lg:text-[3.5rem]">Sample Lists</div>
          <div className="flex select-none items-center justify-center cursor-pointer flex-row justify-end ">
            <div
              className="px-[2rem] hover:bg-yellow-200 transition-all mx-[1rem] border-[1px] border-black rounded-full"
              onClick={prev}
            >
              <div className="">&larr; </div>
            </div>
            <div
              className="px-[2rem] hover:bg-yellow-200 transition-all border-[1px] border-black rounded-full"
              onClick={next}
            >
              <div className="">&rarr; </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* /arrow */}
      {/* carousel start */}
      <div
        ref={carousel}
        className={`select-none transition-transform duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] grid gap-[2vw] pt-[2rem] text-[5rem] mx-auto subtitle-text px-[5px] grid-cols-3`}
        style={{ transform: "translate3d(" + position + "px, 0px, 0px)", width: `${carouselWidth}vw` }}
      >
        {sampleLists.map((currentList, x) => {
          return (
            <div key={x} >
              <div className="col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white  rounded-[1rem] ">
                <Link href="./">
                  <div 
                      style={{ backgroundImage: `url(${currentList.img})` }} 
                      className="bg-cover bg-center w-full h-full transition-all ease-in duration-[1200ms] flex flex-col items-center justify-center">
                      <div className="flex text-[--neon] w-full h-full flex-col items-center justify-center">
                        <div className="text-[2.3vw] font-[Crimson] font-italic leading-[100%] translate-y-[20%]">
                          {currentList.title}
                        </div>
                        <div className="text-[3vw] font-[Golos] font-bold leading-[100%]">
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
