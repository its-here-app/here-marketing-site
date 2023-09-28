import arrowSubmit from "/public/graphics/arrow-right.svg";
import successCheck from "/public/icons/success-check.svg";
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
  const [success, setSuccess] = useState(false);
  const [successMessage, setMessage] = useState("sending... 💌");
  const inputRef = useRef(null);
  let emailPlaceholderCopy = "Enter email for exclusive access";
  useEffect(() => {
    // if viewport is mobile, set email palceholder to "email"
    if (window.innerWidth < 768) {
      emailPlaceholderCopy = "Email.";
    }
  }, []);
  useEffect(() => {
    if (status === "success") {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(true);
      }, 1000);
      setMessage("Email added. Can’t wait to keep you updated!");
      clearFields();
    } else if (status === "error") {
      setSuccess(false);
      setMessage("sorry, something went wrong :( try again?");
    }
  }, [status]);

  useEffect(() => {
    if (currentSlide > 0) {
      inputRef.current.focus();
    }
  }, [currentSlide]);

  const clearFields = () => {
    setName("");
    setEmail("");
  };

  const submit = (e) => {
    e.preventDefault();
    email &&
      name &&
      email.indexOf("@") > -1 &&
      onSubmitted({
        EMAIL: email,
        MERGE1: name,
      });
    setCurrentSlide(null);
  };

  const nextFormStep = (e) => {
    e.preventDefault();
    // prevent spam submissions by checking for @, with a .com or .edu after
    if (email.indexOf("@") > -1 && email.indexOf(".") > -1) {
      setCurrentSlide(1);
    } else {
      clearFields();
      alert("please enter a valid email address");
    }
  };

  return (
    <div className="relative mt-[1rem] w-full justify-center">
      {currentSlide === 0 && (
        <form>
          <input
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
            type="email"
            value={email}
            name="email"
            className="email-input"
            placeholder={emailPlaceholderCopy}
          ></input>

          <button
            className="email-button"
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
            ref={inputRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="name"
            name="name"
            className="email-input"
            placeholder="we'd love to know your name!"
          ></input>
          <button
            className="email-button"
            onClick={(e) => submit(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit(e);
              }
            }}
          >
            <Image alt="none" fill src={arrowSubmit} />
          </button>
        </form>
      )}
      {currentSlide === null && (
        <form>
          <input
            autoComplete="off"
            type="message"
            name="message"
            disabled
            className={classNames("email-input", {
              "placeholder:text-[--neon]": success,
            })}
            placeholder={successMessage}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="email-button"
          >
            <Image alt="none" fill src={successCheck} />
          </button>
        </form>
      )}
    </div>
  );
};

export default MailChimpForm;
