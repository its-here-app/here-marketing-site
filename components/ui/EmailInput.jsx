"use client";

import { useState } from "react";

const EmailInput = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null); // reset message

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
      setMessage("You're in!");
      setEmail("");
    } else if (data.custom) {
      setStatus("error");
      setMessage(data.custom);
    } else {
      setStatus("error");
      setMessage(data.error?.detail || "Something went wrong. Try again.");
    }
  }

  return (
    <div className={`${className} w-[50rem] max-w-full sm:max-w-[68%]`}>
      <form
        onSubmit={handleSubmit}
        className="relative transition-all duration-400 text-neon"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>

        <input
          className="placeholder-neon-50p text-body-lg border border-neon rounded-2xl md:rounded-3xl py-4 px-4 md:py-7 md:px-8 w-full autofill:!bg-neon"
          id="email"
          type="email"
          name="email"
          placeholder="Enter email for exclusive access"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          aria-label="Submit"
          className="bg-neon rounded-full w-[2.4rem] h-[2.4rem] md:w-[3.375rem] md:h-[3.375rem] bg-[url('/images/icons/icon-arrow-green.svg')] bg-cover bg-center absolute right-[.6rem] md:right-[1rem] top-1/2 -translate-y-1/2 cursor-pointer transition duration-200 hover:scale-112"
        />
      </form>

      {/* Status message */}
      {status && (
        <p
          className={`mt-6 text-body-md ${
            status === "success" ? "text-neon" : "text-white/60"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailInput;
