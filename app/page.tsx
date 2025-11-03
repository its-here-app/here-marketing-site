"use client";

import Button from "@/components/ui/Button";
import ValuePropSection from "@/components/ValuePropSection";
import PlaylistCarousel from "@/components/PlaylistCarousel";
import "./home.css";
import Navbar from "@/components/Navbar";
import SpotCard from "@/components/SpotCard";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Home() {
  const cardsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["0.25 0.5", "0.75 0.5"],
  });

  // Move and slightly scale cards as we scroll from ValueProp 1 → 2
  const card1X = useTransform(scrollYProgress, [0, 1], ["19%", "25%"]);
  const card1Y = useTransform(scrollYProgress, [0, 1], ["3vh", "25vh"]);
  const card1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);

  // Move and slightly scale cards as we scroll from ValueProp 1 → 2
  const card2X = useTransform(scrollYProgress, [0, 1], ["19%", "25%"]);
  const card2Y = useTransform(scrollYProgress, [0, 1], ["3vh", "25vh"]);
  const card2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);

  // Move and slightly scale cards as we scroll from ValueProp 1 → 2
  const card3X = useTransform(scrollYProgress, [0, 1], ["19%", "25%"]);
  const card3Y = useTransform(scrollYProgress, [0, 1], ["3vh", "25vh"]);
  const card3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1]);

  return (
    <div>
      <Navbar />
      <section className="container pb-4">
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
      </section>
      <PlaylistCarousel />

      {/* Value prop sections */}
      <div ref={cardsRef} className="text-balance relative h-[150vh] mb-[50vh]">
        <div className="sticky top-0 ml-[50%] w-[50%] relative">
          <motion.div
            style={{
              position: "absolute",
              top: card1Y,
              right: card1X,
              scale: card1Scale,
              width: "40%",
            }}
          >
            <SpotCard
              className="w-full"
              name="360 Chicago"
              rating="4.5"
              numReviews="19k"
            />
          </motion.div>
          <SpotCard
            className="hidden absolute right-[-4%] top-[43%]"
            name="Grace Street Desserts"
            rating="4.5"
            numReviews="3.3k"
            width="20%"
            ratio="1.2"
          />
          <SpotCard
            className="hidden absolute right-[25%] top-[66%]"
            name="Greystone Mansion & Gardens"
            rating="4.6"
            numReviews="3.2k"
            width="20%"
            ratio="1.2"
          />
        </div>
        {/* Value prop 1 */}
        <ValuePropSection
          header="Stuck on where to go? Discover new spots"
          subhead="Find new spots you like based on your favorites, who you follow, and places you’ve been"
          CTA="Explore spots"
        ></ValuePropSection>

        {/* Value prop 2 */}
        <ValuePropSection
          header="Easily import your existing lists"
          subhead="Start your city playlist with existing notes, Google docs, Instagram, or Maps"
          CTA="Import your spots"
        ></ValuePropSection>
      </div>
      {/* Value prop 3 */}
      <ValuePropSection
        header="Share your playlists with friends "
        subhead="Keep all your fave spots in playlists and easily share when your friends ask"
        CTA="Start your profile"
      >
        <div className="home_share-stickers aspect-square w-[90%] max-w-[28rem] md:max-w-[50%] -mt-6 md:mt-0 mb-1 md:mb-0 relative">
          <div className="home_share-juliette">
            <img
              src="images/photos/juliette.webp"
              alt=""
              className="w-[100%] sticker-1"
            />
            <img
              src="images/stickers/sticker-smiley.svg"
              alt=""
              className="w-[50%] sticker-2 -top-[5%] -left-[15%]"
            />
            <img
              src="images/stickers/sticker-globe.svg"
              alt=""
              className="w-[65%] sticker-3 bottom-0 -right-[33%]"
            />
          </div>
          <div className="top-[17%] -right-[3%] md:right-0 home_share-em">
            <img
              src="images/photos/em.webp"
              alt=""
              className="w-[100%] sticker-1"
            />
            <img
              src="images/stickers/sticker-share.svg"
              alt=""
              className="w-[30%] sticker-2 -top-[12%] right-[20%]"
            />
            <img
              src="images/stickers/sticker-playlists.svg"
              alt=""
              className="w-[78%] sticker-3 bottom-[12%] -left-[18%]"
            />
          </div>
          <div className="bottom-0 left-[23%] home_share-ekin">
            <img
              src="images/photos/ekin.webp"
              alt=""
              className="w-[100%] sticker-1"
            />
            <img
              src="images/stickers/sticker-cities.svg"
              alt=""
              className="w-[70%] sticker-2 top-[6%] -left-[35%]"
            />
            <img
              src="images/stickers/sticker-eyes.svg"
              alt=""
              className="w-[45%] sticker-3 top-[35%] -right-[15%]"
            />
          </div>
        </div>
      </ValuePropSection>
    </div>
  );
}
