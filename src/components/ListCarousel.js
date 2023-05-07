import * as React from "react";
import ImageFlipper from "./ImageFlipper";
import { useState, useEffect } from "react";

const FeaturedWork = () => {
  const [position, setPosition] = useState(20);
  const [increment, setIncrement] = useState(0);
  const projectWidth = 3000;
  const amtWorks = 3;
  useEffect(() => {
    // console.log("hovering:", hovering);
    let amtWorks = 3;
    let projectWidth = 3000;
    let inc = projectWidth / amtWorks;
    setIncrement(inc);
  }, []);

  useEffect(() => {
    // setLength(products.edges.length);
    console.log(position);
  }, [position]);
  
  const next = () => {
    if (position > (-amtWorks * increment) / 2) {
      setPosition((prevState) => prevState - increment);
    }
  };
  const prev = () => {
    if (position < 0) setPosition((prevState) => prevState + increment);
  };

  const lists = [
    {
      
    },
    {

    },
  ]


  return (
    <section className=" mx-auto overflow-hidden ">
      <div className="text-[3rem] lg:px-[12px] pt-[3rem] leading-tight">
        <div className="container mx-auto flex flex-row w-full justify-between">
          <div>Featured Work</div>
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
        style={{ width: projectWidth, transform: "translate3d(" + position + "px, 0px, 0px)" }}
      >
        <div>
          <div className="border-t-[1px] border-white mx-[10px] mb-[30px] text-[1.5rem] text-white">
            <div className="w-full flex items-center  justify-between">
              <div className="flex flex-col">
                <div>Halogen Vinyl</div>
                <div className="font-mono text-[1rem] hover:underline uppercase">
                  {" "}
                  WEB + BRANDING{" "}
                </div>
              </div>
              <a className="font-mono text-[1rem] flex ">
                <div className="translate-y-[-1px]">●&nbsp;</div>{" "}
                <div className="hover:underline"> visit site </div>
              </a>
            </div>
          </div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[5/3] overflow-hidden bg-white rounded-lg ">
            <div className="w-full h-full hover:scale-[1.05] transition-all ease-in duration-[1200ms] flex flex-col items-center justify-center">

            </div>
          </div>
        </div>
        <div>
          <div className="border-t-[1px] border-white mx-[10px] mb-[30px] text-[1.5rem] text-white">
            <div className="flex flex-col">
              <div>Halogen Vinyl</div>
              <div className="font-mono text-[1rem] hover:underline uppercase">
                {" "}
                WEB + BRANDING{" "}
              </div>
            </div>{" "}
          </div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[5/3] overflow-hidden bg-white rounded-lg ">
            <div className="w-full h-full hover:scale-[1.05] transition-all ease-in duration-[1200ms] flex flex-col items-center justify-center">
              <ImageFlipper
                imageSources={[
                  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80",
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="border-t-[1px] border-white mx-[10px] mb-[30px] text-[1.5rem] text-white">
            <div className="mt-[2px]">Aloe Health</div>
          </div>
          <div className="col-span-1 mx-[5px] my-[5px] aspect-[5/3] overflow-hidden bg-white rounded-lg ">
            <div className="w-full h-full hover:scale-[1.05] transition-all ease-in duration-[1200ms] flex flex-col items-center justify-center">
              <ImageFlipper
                imageSources={[
                  "https://images.unsplash.com/photo-1426900985728-92d56f56fdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXw1NTM2NDV8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
