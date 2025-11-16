"use client";

import "./home.css";

import Button from "@/components/ui/Button";
import ValuePropSection from "@/components/ValuePropSection";
import PlaylistCarousel from "@/components/PlaylistCarousel";
import Navbar from "@/components/Navbar";
import PlaylistCard from "@/components/PlaylistCard";
import PhoneSection from "@/components/PhoneSection";

import SlideIn from "@/components/motion/SlideIn";
import SmoothScroll from "@/components/motion/SmoothScroll";

import { useScroll } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const cardsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  });

  const playlists = [
    {
      playlistName: "Picturesque waterfronts",
      cover: "/images/photos/playlists/waterfronts.webp",
      wrapperClasses:
        "bottom-[11%] md:bottom-[-25%] left-[-10%] md:left-[10%] rotate-[-12deg]",
      playlistClasses: `group-hover:-translate-y-[10vh] md:group-hover:-translate-y-[48vh] md:group-hover:-translate-x-[-107%] group-hover:rotate-[12deg]`,
    },
    {
      playlistName: "Cozy coffee shops",
      cover: "/images/photos/playlists/cozy-coffee-shops.webp",
      wrapperClasses:
        "bottom-[9%] md:bottom-[-20%] left-[12%] md:left-[24%] rotate-[-3deg]",
      playlistClasses: `group-hover:-translate-y-[10vh] md:group-hover:-translate-y-[48vh] md:group-hover:-translate-x-[-42%] group-hover:rotate-[3deg]`,
    },
    {
      playlistName: "Romantic sweet spots in the city",
      cover: "/images/photos/playlists/sweet-spots.webp",
      wrapperClasses:
        "z-50 md:z-auto bottom-[12%] md:bottom-[-15%] rotate-[1.5deg]",
      playlistClasses: `group-hover:-translate-y-[10vh] md:group-hover:-translate-y-[48vh] group-hover:rotate-[-1.5deg]`,
    },
    {
      playlistName: "Tucked-away bookstores",
      cover: "/images/photos/playlists/bookstores.webp",
      wrapperClasses:
        "bottom-[9%] md:bottom-[-22%] right-[8%] md:right-[20%] rotate-[-5deg] md:rotate-[2.8deg]",
      playlistClasses: `group-hover:-translate-y-[10vh] md:group-hover:-translate-y-[48vh] md:group-hover:-translate-x-[47%] group-hover:rotate-[-2.8deg]`,
    },
    {
      playlistName: "Scenic overlooks",
      cover: "/images/photos/playlists/overlooks.webp",
      wrapperClasses:
        "bottom-[12%] md:bottom-[-25%] right-[-10%] md:right-[9%] rotate-[4.5deg]",
      playlistClasses: `group-hover:-translate-y-[10vh] md:group-hover:-translate-y-[52vh] md:group-hover:-translate-x-[90%] group-hover:rotate-[-4.5deg]`,
    },
  ];

  return (
    <div>
      <SmoothScroll />
      <Navbar />
      <section className="container pb-4">
        <SlideIn>
          <h1 className="text-radio-1 justify-between hidden md:flex">
            <div>
              For the spots<br></br>you love{" "}
            </div>
            <div>
              <br></br> & the places<br></br>you’ll go
            </div>
          </h1>
          <h1 className="text-radio-1 md:hidden mb-4">
            For the spots you love & the places you’ll go
          </h1>
          <h2 className="md:[margin-top:clamp(-3rem,-4vw,-3rem)]">
            Discover and share favorite spots<br></br>through city playlists*
          </h2>
          <Button variant="primary" className="sm:hidden mt-6">
            Start for free
          </Button>
        </SlideIn>
      </section>

      <PlaylistCarousel />

      <ValuePropSection ref={cardsRef} />

      <div className="px-[clamp(.5rem,2vw,2rem)] flex justify-center">
        <div className="bg-black rounded-4xl h-screen max-h-[38rem] md:max-h-[48rem] xl:max-h-[56rem] md:h-[clamp(38rem,100vh,56rem)] text-white flex flex-col justify-center items-center overflow-hidden w-full relative transition-[height,max-height] duration-300 ease-out">
          <SlideIn>
            <div className="text-center mt-[-12rem]">
              <h2 className="mb-4">Capture all your favorites</h2>
              <p className="text-radio-1">Start today</p>
            </div>
          </SlideIn>
          {playlists.map((playlist, index) => (
            <div
              className={`${playlist.wrapperClasses} group absolute`}
              key={index}
            >
              <PlaylistCard
                playlistName={playlist.playlistName}
                cover={playlist.cover}
                className={`${playlist.playlistClasses} !mr-0 !ease-[cubic-bezier(0.34,1.3,0.64,1)] select-none pointer-events-none
`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 
      <div className="min-h-[calc(100vh+8rem)] h-full bg-gradient-to-t from-neon to-neon/0 -mb-16 text-center flex flex-col items-center relative pt-16">
        <div className="sticky top-0 flex flex-col items-center z-20">
          <h2 className="text-radio-1 max-w-[48rem] mt-16">
            Discover your next favorite spot
          </h2>
          <div className="relative h-[773px] w-full flex flex-col items-center">
            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[20.9375rem] h-[650px] overflow-hidden rounded-[2.5rem] z-10" />

            <img
              className="absolute top-0 z-20 pointer-events-none"
              src="/images/graphics/phone.png"
              alt="iPhone"
              style={{ height: "100%" }}
            />
          </div>
        </div>

        <div
          className="relative w-[20.9375rem] z-10"
          style={{ marginTop: "-750px" }}
        >
          <img
            src="/images/graphics/home-feed.png"
            alt="Here home feed"
            style={{ width: "100%" }}
          />
        </div>
      </div>
*/}

      <PhoneSection />
    </div>
  );
}
