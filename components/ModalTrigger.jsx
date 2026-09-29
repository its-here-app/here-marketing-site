"use client";

export default function ModalTrigger({ children, className = "" }) {
  return (
    <div
      onClick={() => {
        window.location.href = "/signin";
      }}
      className={`${className} cursor-pointer`}
      style={{ display: "inlineblock" }}
    >
      {children}
    </div>
  );
}
