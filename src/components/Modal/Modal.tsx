import { FC } from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

import { useEscapeKeyClose } from "../../hooks/useEscapeKeyClose";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal: FC<ModalProps> = ({ children, title, toggleModal }) => {
  useEscapeKeyClose(toggleModal);

  const handleClickOnBackdrop = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="flex items-center justify-center fixed bg-black backdrop-blur-md bg-opacity-40 w-screen h-screen left-0 top-0 z-50"
      onClick={handleClickOnBackdrop}
    >
      <div className="relative bg-white w-[80vw] md:max-w-[500px] rounded-md">
        {title && (
          <h2 className="font-bold text-[20px] bg-teal-500 text-white py-3 px-5 shadow-sm rounded-t-md">
            {title}
          </h2>
        )}
        <button
          type="button"
          onClick={toggleModal}
          className="absolute top-3 right-3"
        >
          <IoClose className="fill-gray-800 size-7" />
        </button>
        <div className="p-7">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
