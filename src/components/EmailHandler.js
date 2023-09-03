import arrowSubmit from "/public/graphics/arrow-right.svg";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import stickerCityDate from "/public/stickers/sticker-city-date.svg";
import stickerLocalRecs from "/public/stickers/sticker-local-recs.svg";

const EmailForm = ({ status, message, onValidated }) => {
  let email, name;

  const [currentSlide, setCurrentSlide] = useState(0);

  const submit = () => {
    email &&
      // name &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
        // NAME: name.value,
      });
  };

  return (
    <div className="w-full">
      <div className="w-full tracking-[-0.03em] font-[Radio] text-white text-[70px] md:text-[100px] lg:text-[90px] xxl:text-[140px] ">
        Try out here*
      </div>
      <div className="relative mt-[1rem] w-full md:w-[600px] lg:w-[800px]  justify-center ">
        <input
          ref={(node) => (email = node)}
          type="email"
          name="email"
          className="email-input required-email"
          placeholder="Enter email for exclusive access"
        ></input>
        <button
          className="cursor-none hover:scale-[1.25] transition-all w-[40px] lg:w-[50px] absolute right-[20px] h-full items-top justify-end "
          type="submit"
          onClick={submit}
        >
          <Image alt="none" fill src={arrowSubmit} />
        </button>
        <div className="absolute pt-[1rem] flex w-full h-auto items-center justify-center">
          {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
          {status === "error" && <div className="bg-red-200">error 😭 try again</div>}
          {status === "success" && (
            <div className=" text-green-600">
              {" "}
              thank you 💖 you've been added to our beta tester list{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModalForm = ({ status, message, onValidated }) => {
  let email, name;

  const submit = () => {
    email &&
    // name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      // NAME: name.value,
    });
  }

  return (
    <div className="w-full fade-in">
      <div className="flex flex-col gap-[2.5rem] w-full tracking-[-0.03em]  text-white ">
        <div className="w-full h-auto flex flex-row-reverse gap-[2.5rem]">
          <div className="relative h-[200px] w-full md:w-[30%] translate-x-[-50px]">
            <Image
              alt="none"
              className="absolute left-[30%] bottom-[45%] w-[220px]"
              src={stickerLocalRecs}
            />
            <Image
              alt="none"
              className="absolute left-[10%] bottom-[10%] w-[200px]"
              src={stickerCityDate}
            />
          </div>
          <div className="w-full flex flex-col gap-[2.5rem] md:w-[70%] ">
            <div className="flex flex-col font-[Radio] text-[48px] md:text-[64px] leading-[60px]">
              <span className="whitespace-nowrap">We're excited</span>
              <span className="whitespace-nowrap">that you're excited</span>
            </div>
            <div className="font-[Golos] text-[20px] leading-normal ">
              Get notified when we officially launch and be the first to know when it comes to
              exclusive access or updates!
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <input
            ref={(node) => (email = node)}
            type="email"
            name="email"
            className="email-input required-email"
            placeholder="Enter email for exclusive access"
          ></input>
          <button
            className="cursor-none hover:scale-[1.2] transition-all w-[40px] lg:w-[50px] absolute right-[12px] h-full items-top justify-end "
            type="submit"
            onClick={submit}
          >
            <Image alt="none" fill src={arrowSubmit} />
          </button>
        </div>
        <div className="h-auto w-max transition-all mx-auto">
          {status === "sending" && (
            <div className="snackbar-status" style={{ color: "blue" }}>
              sending...
            </div>
          )}
          {status === "error" && <div className="snackbar-status">error 😭 try again</div>}
          {status === "success" && (
            <div className="snackbar-status text-green-600">
              {" "}
              thank you 💖 you've been added to our beta tester list{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// this is such a weird and foreign pattern to me
const MCForm = ({ isModal = false }) => {
  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  return (
    <>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) =>
          isModal ? (
            <ModalForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          ) : (
            <EmailForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )
        }
      />
    </>
  );
};

export default MCForm;
