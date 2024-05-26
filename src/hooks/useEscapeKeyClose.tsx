import { useEffect } from "react";

export const useEscapeKeyClose = (toggleModal: () => void) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [toggleModal]);
};
