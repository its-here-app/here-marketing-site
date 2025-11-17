"use client";

import { useModal } from "@/context/ModalContext";

export default function ModalTrigger({ children, className = "" }) {
  const { openModal } = useModal();

  return (
    <div
      onClick={openModal}
      className={`${className} cursor-pointer`}
      style={{ display: "inlineblock" }}
    >
      {children}
    </div>
  );
}
