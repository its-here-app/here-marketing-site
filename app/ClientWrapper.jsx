"use client";

import { ModalProvider } from "@/context/ModalContext";
import ModalRootClient from "./ModalRootClient";

export default function ClientWrapper({ children }) {
  return (
    <ModalProvider>
      <ModalRootClient>{children}</ModalRootClient>
    </ModalProvider>
  );
}
