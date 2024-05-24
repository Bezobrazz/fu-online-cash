import ReactDOM from "react-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { useEscapeKeyClose } from "../../hooks/useEscapeKeyClose";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
}

const modalRoot = document.querySelector("#modalRoot")!;

export const Modal = ({ children, toggleModal }: ModalProps) => {
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
      <div className="relative rounded-xl bg-teal-400 p-10">
        <button
          type="button"
          onClick={toggleModal}
          className="absolute top-2.5 right-2.5"
        >
          <IoMdCloseCircleOutline className="fill-red-500 size-6 hover:fill-red-600" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
