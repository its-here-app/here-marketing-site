import logoOG from "/public/graphics/logo-og.svg";
import arrowSubmit from "/public/graphics/arrow-right.svg";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";


const EmailForms = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    // name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      // NAME: name.value,
    });

  return (
    <div className="relative">
      <div className="relative flex flex-col justify-between gap-[5rem] mx-[1rem] md:mx-[5rem]">
        <div className="w-full font-[Radio] text-white text-[4rem] lg:text-[6vw] ">
          Try it out here*
        </div>

        <div className="relative w-[95%] max-w-[800px] justify-center ">
          <input
            ref={(node) => (email = node)}
            type="text"
            className="py-[1rem] cursor-none w-full text-[2rem] lg:text-[3vw] text-white px-[1rem] h-full email-input"
            placeholder="your email for exclusive access"
          ></input>
          <button
            className="cursor-none hover:scale-[1.5] transition-all absolute right-[20px] h-full items-top justify-end "
            type="submit"
            onClick={submit}
          >
            <Image alt="none" src={arrowSubmit} />
          </button>
          
          <div className="absolute pt-[1rem] flex w-full h-auto items-center justify-center">
            {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
            {status === "error" && (
              <div className="bg-red-200">error 😭 try again</div>
            )}
            {status === "success" && (          
              <div className=" text-green-600"> thank you 💖 you've been added to our beta tester list </div>
            )}
          </div>
        </div>

        <div className="">
          <Image alt="none" src={logoOG} />
        </div>
      </div>
  
    </div>
  );
};

export default EmailForms;