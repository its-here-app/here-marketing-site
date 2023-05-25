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
    <div className="relative h-[90%] pt-[4rem] md:pt-[3rem]  md:h-auto gap-[3rem] flex flex-col mx-[1rem] md:mx-[6rem]">
      <div className="w-full font-[Radio] text-white text-[5rem] md:text-[9vw] xl:text-[8vw] ">
        Try out here*
      </div>
      <div className="relative mt-[1rem] w-full md:w-[60%] lg:w-[55%]  justify-center ">
        <input
          ref={(node) => (email = node)}
          type="text"
          className="py-[1rem] cursor-none w-full text-[1.1rem] md:text-[1.5rem]  lg:text-[2vw] text-white px-[1rem] h-full email-input"
          placeholder="Enter email for exclusive access"
        ></input>
        <button
          className="cursor-none hover:scale-[1.5] transition-all w-[40px] lg:w-[60px] absolute right-[10px] h-full items-top justify-end "
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

export default EmailForms;
