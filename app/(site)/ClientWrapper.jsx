"use client";

import { ModalProvider } from "@/context/ModalContext";
import ModalRootClient from "./ModalRootClient";
import CustomCursor from "@/components/CustomCursor";

export default function ClientWrapper({ children }) {
  return (
    <ModalProvider>
      <CustomCursor />
      <ModalRootClient>{children}</ModalRootClient>
    </ModalProvider>
  );
}
