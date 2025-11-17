"use client";

import { useModal } from "@/context/ModalContext";
import StartYourPlaylistModal from "@/components/StartYourPlaylistModal";

export default function ModalRootClient({ children }) {
  const { isModalOpen, closeModal } = useModal();

  return (
    <>
      {children}
      <StartYourPlaylistModal open={isModalOpen} onClose={closeModal} />
    </>
  );
}
