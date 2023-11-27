"use client";
import MailChimpForm from "../components/EmailHandler";
import Image from "next/image";
import logoOG from "/public/graphics/logo-og.svg";
import logoLockup from "/public/graphics/logo-lockup.svg";
import stickerStartYourPlaylist from "/public/stickers/sticker-start-your-playlist.svg";
import stickerInstagramOutline from "/public/stickers/sticker-instagram-outline.svg";
import stickerEmailUs from "/public/stickers/sticker-email-us.svg";
import stickerLockupOcean from "/public/stickers/sticker-lockup-ocean.svg";
import { useEffect, useState } from "react";

export const Footer = ({ isHomepage = true }) => {
  useEffect(() => {
    setEmailInput(document.querySelector('.email-input'));
  }, []);

  const [emailInput, setEmailInput] = useState(null);

  const setFocus = () => {
    emailInput.focus();
  };

  return (
    <div className="container relative bg-[--black] pt-12 lg:pt-15 px-4 w-full mx-auto flex flex-col justify-between h-full">
      {/* i removed max-w-[1738px] */}
      <div
        className="
        absolute w-[170px] h-[200px]
        hidden md:block
        scale-[.5]lg:scale-[.8]
        bottom-[30%] md:bottom-[50%] lg:bottom-[55%]
        right-[15%] md:right-[5%] lg:right-[15%]"
      >
        <Image alt="none" fill className="absolute top-0 pop-in" src={stickerLockupOcean} />
      </div>
      <a
        href="https://instagram.com/itshere.app"
        target="blank"
        className="cursor-pointer
           absolute hidden md:block
           w-[140px] h-[140px]
           right-[30%]
           md:bottom-[60%]
           bottom-[40%]"
      >
        <Image
          alt="none"
          id="cta-sticker-footer"
          className="z-30 w-full h-full"
          data-cursor-state="asterisk"
          src={stickerInstagramOutline}
        />
      </a>

      {!isHomepage && (
        <div
          // set focus to email-input on click
          onClick={setFocus}
          className="block absolute
          cursor-pointer
          z-100
          w-[230px] h-[150px]
          scale-[.8] md:scale-[1] lg:scale-[1.2]
          bottom-[30%] md:bottom-[35%] lg:bottom-[30%]
          right-[10%] lg:right-[10%]"
        >
          <Image
            alt="none"
            id="cta-sticker-footer"
            className="z-30 fade-in scale-[0.95]"
            data-cursor-state="asterisk"
            src={stickerStartYourPlaylist}
          />
        </div>
      )}
      <div
        className="cursor-pointer 
           absolute block md:hidden
           w-[100px] h-[100px]
           bottom-[20%]
           right-[10%]"
      >
        <Image
          alt="none"
          id="cta-sticker-footer"
          className="z-30 w-full h-full"
          data-cursor-state="asterisk"
          src={stickerEmailUs}
        />
      </div>
      <a
        href="https://instagram.com/itshere.app"
        target="blank"
        className="cursor-pointer 
           absolute block md:hidden
           w-[140px] h-[140px]
           bottom-[30%]
           left-[10%]"
      >
        <Image
          alt="none"
          id="cta-sticker-footer"
          className="z-30 w-full h-full"
          data-cursor-state="asterisk"
          src={stickerInstagramOutline}
        />
      </a>

      <div className="w-full">
        <div className="md:pl-20 xxl:pl-32">
          <div className="w-full tracking-[-0.03em] font-[Radio] text-white text-[70px] md:text-[80px] lg:text-[90px] xxl:text-[140px] ">
            Try out here*
          </div>
          <div className="relative mt-[1rem] w-full md:w-[600px] lg:w-[800px]  justify-center">
            <MailChimpForm />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex md:hidden gap-4 h-auto px-4 text-[20px] w-full flex-col text-white">
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLScsPPpWZztGYAwZH3V3czQodyYgmy4mQFYhTmdLr33k08Bd1g/viewform?usp=sf_link"
          >
            Give Feedback ↗
          </a>
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfjpdGJCZD6t4N497kd-iC8hxJCkKeJ6P2ztHBeUX1HFvytcw/viewform?usp=sf_link"
            className=""
          >
            Feature your list ↗
          </a>
        </div>
        <div className="h-[60px] mb-8 px-4 lg:px-8 flex w-full justify-between">
          <a href="/" className="relative flex items-center justify-center h-full w-[40px]">
            <Image alt="none" fill src={logoOG} />
          </a>
          <div className="flex flex-row text-6 w-[65%] ext-[400]  max-w-[600px] h-full items-center md:justify-between justify-end text-white font-[Golos]">
            <a
              // href="mailto:team@itshere.app"
              href="https://docs.google.com/forms/d/e/1FAIpQLScsPPpWZztGYAwZH3V3czQodyYgmy4mQFYhTmdLr33k08Bd1g/viewform?usp=sf_link"
              id="contact-us-footer"
              className="cursor-none whitespace-nowrap hidden md:flex"
            >
              {/* Contact us ↗ */}
              Give Feedback ↗
            </a>
            <a
              // href="https://instagram.com/itshere.app"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfjpdGJCZD6t4N497kd-iC8hxJCkKeJ6P2ztHBeUX1HFvytcw/viewform?usp=sf_link"
              target="blank"
              id="follow-us-footer"
              className="cursor=none whitespace-nowrap hidden md:flex"
            >
              {/* Follow us on instagram ↗ */}
              Feature your list ↗
            </a>
            <div className="whitespace-nowrap">Here 2023 ©</div>
          </div>
        </div>
      </div>
    </div>
  );
};
