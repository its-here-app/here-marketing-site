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
    <div className="relative pt-[5rem] h-[90%]  md:h-auto md:gap-[2rem] flex flex-col mx-[1rem] md:mx-[5rem]">
      <div className="w-full font-[Radio] text-white text-[4rem] md:text-[8vw] ">
        Try out here*
      </div>
      <div className="relative mt-[1rem] w-[95%] lg:w-[55%]  justify-center ">
        <input
          ref={(node) => (email = node)}
          type="text"
          className="py-[1rem] cursor-none w-full text-[1.3rem] md:text-[1.5rem] lg:text-[2vw] text-white px-[1rem] h-full email-input"
          placeholder="your email for exclusive access"
        ></input>
        <button
          className="cursor-none hover:scale-[1.5] transition-all absolute right-[10px] h-full items-top justify-end "
          type="submit"
          onClick={submit}
        >
          <Image alt="none" src={arrowSubmit} />
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

export default EmailForms;
