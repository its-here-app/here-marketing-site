import * as React from "react";
// import ImageFlipper from "./ImageFlipper";
import { useState, useEffect } from "react";

const FeaturedWork = () => {
  const [position, setPosition] = useState(20);
  const [increment, setIncrement] = useState(0);
  const carouselWidth = 2000;
  const amtLists = 3;

  useEffect(() => {
    // console.log("hovering:", hovering);
    
    let inc = carouselWidth / amtLists;
    setIncrement(inc);
  }, []);

  useEffect(() => {
    // setLength(products.edges.length);
    console.log(position);
  }, [position]);

  const next = () => {
    if (position > (-amtLists * increment) / 2) {
      setPosition((prevState) => prevState - increment);
    }
  };
  const prev = () => {
    if (position < 0) setPosition((prevState) => prevState + increment);
  };

  const lists = [
    {
      city: "New York",
      title: "Cute date spots",
      image: "/lists/nyc.png",
      numPhotos: 14,
    },
    {
      city: "Chicago",
      title: "Al time faves",
      image: "",
      numPhotos: 14,
    },
    {
      city: "New York",
      title: "A weekend trip",
      image: "",
      numPhotos: 10,
    },
    {
      city: "New York",
      title: "Hidden spots",
      image: "",
      numPhotos: 21,
    },
  ];

  return (
    <section className="relative h-max flex flex-col items-start justify-center mx-auto ">
      <div className="absolute left-0 top-0 text-[3rem] lg:px-[12px] pt-[3rem] leading-tight">
        <div className="container mx-auto flex flex-row w-full justify-between">
          <div className="flex select-none flex-row justify-end ">
            <div className="px-[2rem]" onClick={prev}>
              <div className="">&larr; </div>
            </div>
            <div onClick={next}>
              <div className="">&rarr; </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="transition-transform duration-[800ms] ease-[cubic-bezier(.23,1,.32,1)] grid gap-[40px] pt-[2rem] text-[5rem] mx-auto text-white px-[5px] grid-cols-3"
        style={{ width: carouselWidth, transform: "translate3d(" + position + "px, 0px, 0px)" }}
      >
        <div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white rounded-[14px] lg:rounded-[24px]">
            <div className="w-full h-full scale-[1.02] transition-all bg-none ease-in duration-[1200ms] flex flex-col items-center justify-center">
              <div style={{ backgroundImage: `url(${lists[0].image})` }}  className='w-full h-full'>
                <div className="flex text-[--neon] w-full h-full flex-col items-center justify-center">
                  <div className="text-[3vw] font-[Crimson] font-italic leading-[100%] translate-y-[20%]">{lists[0].city}</div>
                  <div className="text-[4vw] font-[Golos] font-bold leading-[100%]">{lists[0].title}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[1/1] overflow-hidden bg-white rounded-[14px] lg:rounded-[24px]">
            <div className="w-full h-full hover:scale-[1.05] transition-all ease-in bg-[#F46F33] duration-[1200ms] flex flex-col items-center justify-center"></div>
          </div>
        </div>
        <div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[5/3] overflow-hidden bg-white rounded-[14px] lg:rounded-[24px]">
            <div className="w-full h-full hover:scale-[1.05] transition-all ease-in bg-[#F46F33] duration-[1200ms] flex flex-col items-center justify-center"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
