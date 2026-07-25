"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import ValueProp from "@/components/ValueProp";
import SpotCard from "@/components/SpotCard";
import SpotListing from "@/components/SpotListing";
import SlideIn from "@/components/motion/SlideIn";
import FadeIn from "@/components/motion/FadeIn";
import ImportAnimation from "@/components/ImportAnimation";
import { getHomePage } from "@/utils/HomePageUtils";
import { urlFor } from "@/cms/lib/image";

const DEFAULT_PHOTOS = {
  photoJuliette: "/images/photos/juliette.webp",
  photoEm: "/images/photos/em.webp",
  photoEkin: "/images/photos/ekin.webp",
  photoMimi: "/images/photos/mimi.webp",
};

const photoUrl = (image, fallback, width = 800) =>
  image ? urlFor(image).width(width).auto("format").url() : fallback;

const DEFAULT_IMPORT_IMAGES = {
  sourceImage1: "/images/graphics/home/import-list-animation/01.webp",
  sourceImage2: "/images/graphics/home/import-list-animation/02.webp",
  sourceImage3: "/images/graphics/home/import-list-animation/03.webp",
  finalImage: "/images/graphics/home/import-list-animation/04.webp",
};

const DEFAULT_SPOTS = [
  {
    name: "Courage Bagel",
    rating: "4.5",
    reviewCount: "19k",
    imgUrl: "/images/photos/spots/courage-bagel.webp",
    type: "Cafe",
    showOnMobile: false,
  },
  {
    name: "360 Chicago",
    rating: "4.5",
    reviewCount: "19k",
    imgUrl: "/images/photos/spots/360-chicago.webp",
    type: "Observatory deck",
    showOnMobile: true,
  },
  {
    name: "Grace Street Desserts",
    rating: "4.5",
    reviewCount: "3.3k",
    imgUrl: "/images/photos/spots/grace-street-desserts.webp",
    type: "Dessert spot",
    showOnMobile: true,
  },
  {
    name: "Greystone Mansion & Gardens",
    rating: "4.6",
    reviewCount: "3.2k",
    imgUrl: "/images/photos/spots/greystone-mansion.webp",
    type: "Historic site",
    showOnMobile: false,
  },
  {
    name: "Girl & the Goat",
    rating: "4.8",
    reviewCount: "2.9k",
    imgUrl: "/images/photos/spots/girl-&-the-goat.webp",
    type: "American restaurant",
    showOnMobile: true,
  },
];

const DEFAULTS = {
  discoverSection: {
    heading: "Stuck on where to go? Discover new spots",
    subhead:
      "Find new spots you like based on your favorites, who you follow, and places you've been",
    cta: "Explore spots",
  },
  importSection: {
    heading: "Easily import your existing lists",
    subhead: "Start your city playlist with existing notes, Google docs, Instagram, or Maps",
    cta: "Import your spots",
  },
  shareSection: {
    heading: "Share your playlists with friends ",
    subhead: "Keep all your fave spots in playlists and easily share when your friends ask",
    cta: "Start your profile",
  },
};

const ValuePropSection = forwardRef((props, ref) => {
  const [homePage, setHomePage] = useState(null);
  useEffect(() => {
    async function fetchHomePage() {
      const homePage = await getHomePage();
      setHomePage(homePage);
    }
    fetchHomePage();
  }, []);

  const discover = { ...DEFAULTS.discoverSection, ...homePage?.discoverSection };
  const importSection = { ...DEFAULTS.importSection, ...homePage?.importSection };
  const share = { ...DEFAULTS.shareSection, ...homePage?.shareSection };
  const sharePhotos = {
    photoJuliette: photoUrl(share.photoJuliette, DEFAULT_PHOTOS.photoJuliette),
    photoEm: photoUrl(share.photoEm, DEFAULT_PHOTOS.photoEm),
    photoEkin: photoUrl(share.photoEkin, DEFAULT_PHOTOS.photoEkin),
    photoMimi: photoUrl(share.photoMimi, DEFAULT_PHOTOS.photoMimi),
  };

  const importImages = {
    sourceImage1: photoUrl(importSection.sourceImage1, DEFAULT_IMPORT_IMAGES.sourceImage1),
    sourceImage2: photoUrl(importSection.sourceImage2, DEFAULT_IMPORT_IMAGES.sourceImage2),
    sourceImage3: photoUrl(importSection.sourceImage3, DEFAULT_IMPORT_IMAGES.sourceImage3),
    finalImage: photoUrl(importSection.finalImage, DEFAULT_IMPORT_IMAGES.finalImage),
  };

  const discoverSpots = DEFAULT_SPOTS.map((defaultSpot, i) => {
    const spot = discover[`spot${i + 1}`];
    return {
      name: spot?.name || defaultSpot.name,
      rating: spot?.rating || defaultSpot.rating,
      reviewCount: spot?.reviewCount || defaultSpot.reviewCount,
      imgUrl: photoUrl(spot?.image, defaultSpot.imgUrl),
      type: spot?.type || defaultSpot.type,
      showOnMobile: spot?.showOnMobile ?? defaultSpot.showOnMobile,
    };
  });

  const cards1Ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cards1Ref,
    offset: ["start end", "end start"],
  });

  const importHeadingRef = useRef(null);
  const { scrollYProgress: importHeadingTrigger } = useScroll({
    target: importHeadingRef,
    offset: ["center 51%", "center 49%"],
  });

  const importSectionRef = useRef(null);
  const { scrollYProgress: importSectionTrigger } = useScroll({
    target: importSectionRef,
    offset: ["center 61%", "center 59%"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const [importActive, setImportActive] = useState(false);
  useMotionValueEvent(importHeadingTrigger, "change", (v) => {
    if (isMobile) return;
    const active = v > 0.5;
    setImportActive((prev) => (prev === active ? prev : active));
  });
  useMotionValueEvent(importSectionTrigger, "change", (v) => {
    if (!isMobile) return;
    const active = v > 0.5;
    setImportActive((prev) => (prev === active ? prev : active));
  });

  return (
    <div
      ref={ref}
      className="text-balance relative flex flex-col gap-0 md:pt-20 overflow-x-hidden"
    >
      {/* Value prop 1 */}
      <ValueProp
        ref={cards1Ref}
        header={discover.heading}
        subhead={discover.subhead}
        CTA={discover.cta}
      >
        <div className="md:hidden flex flex-col gap-4">
          {discoverSpots
            .filter((spot) => spot.showOnMobile)
            .map((spot, i) => (
              <SlideIn key={spot.name} stagger={`${i + 1}`}>
                <SpotListing
                  name={spot.name}
                  ratings={spot.rating}
                  numReviews={spot.reviewCount}
                  type={spot.type}
                  imgUrl={spot.imgUrl}
                />
              </SlideIn>
            ))}
        </div>
        <div className="hidden md:block">
          <motion.div
            className="absolute left-[-5%] top-[5%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [50, -50]),
              width: "20%",
            }}
          >
            <SpotCard
              name={discoverSpots[0].name}
              imgSrc={discoverSpots[0].imgUrl}
              rating={discoverSpots[0].rating}
              numReviews={discoverSpots[0].reviewCount}
              ratio="1.3"
            />
          </motion.div>

          <motion.div
            className="absolute right-[20%] top-[3%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [50, -150]),
              width: "20%",
            }}
          >
            <SpotCard
              name={discoverSpots[1].name}
              imgSrc={discoverSpots[1].imgUrl}
              rating={discoverSpots[1].rating}
              numReviews={discoverSpots[1].reviewCount}
            />
          </motion.div>

          <motion.div
            className="absolute right-[-5%] top-[43%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [50, -100]),
              width: "18%",
            }}
          >
            <SpotCard
              name={discoverSpots[2].name}
              imgSrc={discoverSpots[2].imgUrl}
              rating={discoverSpots[2].rating}
              numReviews={discoverSpots[2].reviewCount}
              ratio="1.1"
            />
          </motion.div>

          <motion.div
            className="absolute right-[25%] top-[62%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [100, -150]),
              width: "20%",
            }}
          >
            <SpotCard
              name={discoverSpots[3].name}
              imgSrc={discoverSpots[3].imgUrl}
              rating={discoverSpots[3].rating}
              numReviews={discoverSpots[3].reviewCount}
              ratio="1.2"
            />
          </motion.div>

          <motion.div
            className="absolute right-[60%] top-[73%]"
            style={{
              y: useTransform(scrollYProgress, [0, 1], [100, -50]),
              width: "20%",
            }}
          >
            <SpotCard
              name={discoverSpots[4].name}
              imgSrc={discoverSpots[4].imgUrl}
              rating={discoverSpots[4].rating}
              numReviews={discoverSpots[4].reviewCount}
            />
          </motion.div>
        </div>
      </ValueProp>

      {/* Value prop 2 */}
      <ValueProp
        ref={importSectionRef}
        headingRef={importHeadingRef}
        header={importSection.heading}
        subhead={importSection.subhead}
        CTA={importSection.cta}
      >
        <ImportAnimation
          isActive={importActive}
          isMobile={isMobile}
          sourceImages={[
            importImages.sourceImage1,
            importImages.sourceImage2,
            importImages.sourceImage3,
          ]}
          finalImage={importImages.finalImage}
        />
      </ValueProp>

      {/* Value prop 3 */}
      <ValueProp
        header={share.heading}
        subhead={share.subhead}
        CTA={share.cta}
      >
        <div className="home_share-stickers aspect-square w-[90%] max-w-[28rem] md:max-w-[50%] -mt-6 md:mt-0 mb-1 md:mb-0 relative">
          <div className="top-[5%] left-[2%] home_share-juliette">
            <img
              src={sharePhotos.photoJuliette}
              alt=""
              className="w-[100%] sticker-1 sticker-transition"
            />
            <img
              src="images/stickers/sticker-smiley.svg"
              alt=""
              className="w-[50%] sticker-2 -top-[5%] -left-[15%] sticker-transition"
            />
            <img
              src="images/stickers/sticker-globe.svg"
              alt=""
              className="w-[65%] sticker-3 bottom-0 -right-[33%] sticker-transition"
            />
          </div>

          <div className="top-[5%] right-[4%] home_share-em">
            <img
              src={sharePhotos.photoEm}
              alt=""
              className="w-[100%] sticker-1 sticker-transition"
            />
            <img
              src="images/stickers/sticker-share.svg"
              alt=""
              className="w-[33%] sticker-2 top-[8%] -right-[4%] sticker-transition"
            />
          </div>

          <div className="bottom-[5%] left-[2%] home_share-ekin">
            <img
              src={sharePhotos.photoEkin}
              alt=""
              className="w-[100%] sticker-1 sticker-transition"
            />
            <img
              src="images/stickers/sticker-playlists.svg"
              alt=""
              className="w-[78%] sticker-2 -bottom-[6%] -right-[14%] sticker-transition"
            />
          </div>

          <div className="bottom-[5%] right-[2%] home_share-mimi">
            <img
              src={sharePhotos.photoMimi}
              alt=""
              className="w-[100%] sticker-1 sticker-transition"
            />
            <img
              src="images/stickers/sticker-cities.svg"
              alt=""
              className="w-[75%] sticker-2 top-[18%] -left-[36%] sticker-transition"
            />
            <img
              src="images/stickers/sticker-eyes.svg"
              alt=""
              className="w-[45%] sticker-3 -top-[8%] -right-[12%] sticker-transition"
            />
          </div>
        </div>
      </ValueProp>
    </div>
  );
});

ValuePropSection.displayName = "ValuePropSection";

export default ValuePropSection;
