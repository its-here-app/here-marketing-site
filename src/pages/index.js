import Image from "next/image";
import sticker1 from "/public/stickers/1.svg";
import sticker2 from "/public/stickers/2.svg";
import sticker3 from "/public/stickers/3.svg";
import sticker4 from "/public/stickers/4.svg";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  useEffect(() => {});

  const cursorCircle = useRef(null);

  // let cursor = document.getElementsByClassName("circle")[0];

  const [MousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });

  const [hovering, setHovering] = useState(false)
  // const [trailSize, setTrailSize] = useState(10)


  useEffect(() => {
    gsap.to(cursorCircle.current, {
      duration: 0.3,
 
      left: MousePosition.left - 12,
      top: MousePosition.top - 12,
    });
  }, [MousePosition]);

  useEffect(() => {
    // trailSize = 300;
    let foo = cursorCircle.current;
    console.log(foo)
    // foo.classList.add('grow')
    hovering ? foo.classList.add('grow') : foo.classList.remove('grow')
    // gsap.to(cursorCircle.current, {
    //   duration: 0.3,
    //   onRepeat: () =>
    //   width: trailSize,
    //   height: trailSize,
    //   left: MousePosition.left - 12,
    //   top: MousePosition.top - 12,
    // })
  }, [hovering])
  const handleMouseMove = (e) => {
    setMousePosition({ left: e.clientX, top: e.clientY });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="cursor-none flex m-0 p-0 flex-col w-full h-auto bg-black"
    >
      {/* <Cursor MousePosition={MousePosition} /> */}

      <div ref={cursorCircle} className="circle"></div>

      {/* main */}
      <section className="h-[100vh] flex items-center justify-center w-full">
        <div className="relative w-[50vw] max-w-[900px] aspect-square ">
          <div
            id="bg"
            className="absolute w-[30%] h-[30%] top-[0px] left-[45%]"
          >
            <Image fill alt="test" src={sticker3} />
          </div>
          <a href="https://instagram.com/itshere.app" onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)} className="cursor-none absolute w-[50%] h-[50%] top-[25%] left-[45%]">
            <Image fill alt="test" className="spin" src={sticker4} />
          </a>
          <div className="absolute w-[60%] h-[60%] bottom-[0px] left-[0px]">
            <Image fill alt="test" src={sticker1} />
          </div>

          <div className="absolute w-[50%] h-[50%] top-[10%] left-[0px]">
            <Image fill alt="test" src={sticker2} />
          </div>
        </div>
      </section>
      {/* /main */}
      {/* footer */}

      {/* <section className="h-[50vh] w-full bg-[#252525]">howdy</section> */}
      {/* /footer */}
    </div>
  );
}
