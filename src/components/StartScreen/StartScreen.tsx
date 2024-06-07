import { Modal, ShiftStartConfirm } from "../../components";

import { useModal } from "../../hooks";

export const StartScreen = () => {
  const [isOpenModal, toggleModal] = useModal();

  return (
    <>
      <div className="w-full h-[80vh] flex flex-col gap-3 justify-center items-center">
        <h2 className="text-[28px] text-center font-semibold">
          Щоб почати роботу з касою, відкрийте будь ласка, зміну
        </h2>
        <p
          className="text-[20px] cursor-pointer hover:text-teal-500 transition duration-300"
          onClick={toggleModal}
        >
          Відкрити зміну
        </p>
      </div>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          {" "}
          <ShiftStartConfirm toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};
