import { Button, Modal, ShiftStartConfirm } from "../../components";

import { useModal } from "../../hooks";

export const StartScreen = () => {
  const [isOpenModal, toggleModal] = useModal();

  return (
    <>
      <div className="w-full h-[80vh] flex flex-col gap-3 justify-center items-center">
        <h2 className="text-[28px] text-center font-semibold">
          Щоб почати роботу з касою, відкрийте будь ласка, зміну
        </h2>
        <Button type="button" className="primary-btn" onClick={toggleModal}>
          Відкрити зміну
        </Button>
      </div>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <ShiftStartConfirm toggleModal={toggleModal} />
        </Modal>
      )}
    </>
  );
};
