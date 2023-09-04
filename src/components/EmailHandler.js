import arrowSubmit from "/public/graphics/arrow-right.svg";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const MailChimpForm = ({ currentSlide }) => {
  const url = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <EmailForm
          // pass current slide up to parent
          currentSlide={currentSlide}
          status={status}
          message={message}
          onSubmitted={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

const EmailForm = ({ status, message, onSubmitted }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("status...", status);
    if (status === "success") {
      console.log("success");
    }
  }, [status]);

  const submit = (e) => {
    e.preventDefault();
    // get value of email ref
    // get value of name ref
    // if email is valid, call onValidated
    // onValidated will call subscribe(formData)
    // subscribe(formData) will call mailchimp api
    // mailchimp api will send email to user
    // mailchimp api will send email to us
    // mailchimp api will send email to user
    email &&
      name &&
      email.indexOf("@") > -1 &&
      // console.log('fake submitting')
      onSubmitted({
        EMAIL: email,
        MERGE1: name,
        // FNAME: name.value,
      });
  };

  const nextFormStep = (e) => {
    e.preventDefault();
    if (email.indexOf("@") > -1) {
      setCurrentSlide((currentStep) => currentStep + 1);
    } else {
      console.log("needs a valid email");
    }
  };

  return (
    <div className="relative mt-[1rem] w-full md:w-[600px] lg:w-[800px] justify-center fade-in-from-right">
      {currentSlide === 0 && (
        <form>
          <input
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            name="email"
            className="email-input"
            placeholder="Enter email for exclusive access"
          ></input>
          <button
            className="cursor-none hover:scale-[1.25] transition-all w-[40px] lg:w-[50px] absolute right-[20px] h-full items-top justify-end "
            onClick={(e) => nextFormStep(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                nextFormStep(e);
              }
            }}
          >
            <Image alt="none" fill src={arrowSubmit} />
          </button>
        </form>
      )}
      {currentSlide === 1 && (
        <form>
          <input
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="name"
            name="name"
            className="email-input"
            placeholder="name"
          ></input>
          <button
            className="cursor-none hover:scale-[1.25] transition-all w-[40px] lg:w-[50px] absolute right-[20px] h-full items-top justify-end "
            // type submit
            onClick={(e) => submit(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit(e);
              }
            }}
          >
            <Image alt="none" fill src={arrowSubmit} />
          </button>
          {/* <input
            autoComplete="off"
            ref={name}
            type="name"
            name="name"
            className="email-input"
            placeholder="we'd love to know your name!"
          ></input>
          <button
            className="cursor-none hover:scale-[1.25] transition-all w-[40px] lg:w-[50px] absolute right-[20px] h-full items-top justify-end "
            onClick={submit}
          >
            <Image alt="none" fill src={arrowSubmit} />
          </button> */}
        </form>
      )}
    </div>
  );
};

export default MailChimpForm;
