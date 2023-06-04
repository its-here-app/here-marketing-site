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
    <div className="md:pl-[5rem] xxl:pl-[10rem]">
      <div className="w-full tracking-[-0.03em] font-[Radio] text-white text-[70px] md:text-[100px] lg:text-[110px] xxl:text-[140px] ">
        Try out here*
      </div>
      <div className="relative mt-[1rem] w-full md:w-[600px] lg:w-[800px]  justify-center ">
        <input
          ref={(node) => (email = node)}
          type="text"
          className="email-input "
          placeholder="Enter email for exclusive access"
        ></input>
        <button
          className="cursor-none hover:scale-[1.5] transition-all w-[40px] lg:w-[50px] absolute right-[12px] h-full items-top justify-end "
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
