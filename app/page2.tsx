"use client";

import Button from "@/components/ui/Button";
import ValuePropSection from "@/components/ValuePropSection";
import PlaylistCarousel from "@/components/PlaylistCarousel";
import "./home.css";
import Navbar from "@/components/Navbar";
import SpotCard from "@/components/SpotCard";
import SlideIn from "@/components/motion/SlideIn";
import FadeIn from "@/components/motion/FadeIn";
import PopIn from "@/components/motion/PopIn";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const cardsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  });

  return (
    <div>
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

      {/* Value prop sections */}
      <div
        ref={cardsRef}
        className="text-balance relative flex flex-col gap-0 pt-20"
      >
        {/* Value prop 1 */}
        <ValuePropSection
          header="Stuck on where to go? Discover new spots"
          subhead="Find new spots you like based on your favorites, who you follow, and places you’ve been"
          CTA="Explore spots"
        >
          <motion.div
            i
            className="absolute left-[-5%] top-[5%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [50, -150]),
              width: "20%",
            }}
          >
            <SpotCard
              name="Courage Bagel"
              imgSrc="/images/photos/home/courage-bagel.webp"
              rating="4.5"
              numReviews="19k"
              ratio="1.3"
            />
          </motion.div>

          <motion.div
            className="absolute right-[20%] top-[3%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [100, -150]),
              width: "20%",
            }}
          >
            <SpotCard
              name="360 Chicago"
              imgSrc="/images/photos/home/360-chicago.webp"
              rating="4.5"
              numReviews="19k"
            />
          </motion.div>

          <motion.div
            className="absolute right-[-5%] top-[43%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [150, -200]),
              width: "18%",
            }}
          >
            <SpotCard
              name="Grace Street Desserts"
              imgSrc="/images/photos/home/grace-street-desserts.webp"
              rating="4.5"
              numReviews="3.3k"
              ratio="1.1"
            />
          </motion.div>

          <motion.div
            className="absolute right-[25%] top-[62%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [200, -250]),
              width: "20%",
            }}
          >
            <SpotCard
              name="Greystone Mansion & Gardens"
              imgSrc="/images/photos/home/greystone-mansion.webp"
              rating="4.6"
              numReviews="3.2k"
              ratio="1.2"
            />
          </motion.div>

          <motion.div
            className="absolute right-[60%] top-[73%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [130, -150]),
              width: "20%",
            }}
          >
            <SpotCard
              name="Girl & the Goat"
              imgSrc="/images/photos/home/girl-&-the-goat.webp"
              rating="4.8"
              numReviews="2.9k"
            />
          </motion.div>
        </ValuePropSection>

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
            <FadeIn stagger="4">
              <img
                src="images/stickers/sticker-smiley.svg"
                alt=""
                className="w-[50%] sticker-2 -top-[5%] -left-[15%]"
              />
            </FadeIn>
            <FadeIn stagger="8">
              <img
                src="images/stickers/sticker-globe.svg"
                alt=""
                className="w-[65%] sticker-3 bottom-0 -right-[33%]"
              />
            </FadeIn>
          </div>
          <div className="top-[17%] -right-[3%] md:right-0 home_share-em">
            <img
              src="images/photos/em.webp"
              alt=""
              className="w-[100%] sticker-1"
            />
            <FadeIn stagger="6">
              <img
                src="images/stickers/sticker-share.svg"
                alt=""
                className="w-[30%] sticker-2 -top-[12%] right-[20%]"
              />
            </FadeIn>
            <FadeIn stagger="4">
              <img
                src="images/stickers/sticker-playlists.svg"
                alt=""
                className="w-[78%] sticker-3 bottom-[12%] -left-[18%]"
              />
            </FadeIn>
          </div>
          <div className="bottom-0 left-[23%] home_share-ekin">
            <img
              src="images/photos/ekin.webp"
              alt=""
              className="w-[100%] sticker-1"
            />
            <FadeIn stagger="5">
              <img
                src="images/stickers/sticker-cities.svg"
                alt=""
                className="w-[70%] sticker-2 top-[6%] -left-[35%]"
              />
            </FadeIn>
            <FadeIn stagger="7">
              <img
                src="images/stickers/sticker-eyes.svg"
                alt=""
                className="w-[45%] sticker-3 top-[35%] -right-[15%]"
              />
            </FadeIn>
          </div>
        </div>
      </ValuePropSection>
    </div>
  );
}
