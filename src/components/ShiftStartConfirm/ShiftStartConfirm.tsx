import { FC } from "react";

import { Button } from "../../components";

interface ShiftStartConfirmProps {
  toggleModal: () => void;
}

export const ShiftStartConfirm: FC<ShiftStartConfirmProps> = ({
  toggleModal,
}) => {
  return (
    <>
      <div className="mb-[20px]">
        <p className="mb-[10px]">
          Ви дійсно бажаєте відкрити зміну касира{" "}
          <span className="font-bold">Костенко В'ячеслав Вікторович</span> на{" "}
          <span className="font-bold">Форест Малехів Каса 1</span>
        </p>
        <p>Каса має залишок:</p>
        <p className="font-bold">710.00₴</p>
      </div>
      <div className="flex justify-between">
        <Button type="button" className="primary-btn">
          Так
        </Button>
        <Button type="button" className="ordinary-btn" onClick={toggleModal}>
          Ні
        </Button>
      </div>
    </>
  );
};
