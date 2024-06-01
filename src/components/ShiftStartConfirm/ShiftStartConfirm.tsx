interface ShiftStartConfirmProps {
  toggleModal: () => void;
}

export const ShiftStartConfirm = ({ toggleModal }: ShiftStartConfirmProps) => {
  return (
    <div>
      <div className="mb-[20px]">
        <p className="mb-[10px]">
          Ви дійсно бажаєте відкрити зміну касира{" "}
          <span className="font-bold">Костенко В'ячеслав Вікторович</span> на{" "}
          <span className="font-bold">Форест Малехів Каса 1</span>
        </p>
        <p>Каса має залишок:</p>
        <p className="font-bold">710.00₴</p>
      </div>
      <div className="mx-auto w-1/2 flex justify-between">
        <button type="button">Так</button>
        <button type="button" onClick={toggleModal}>
          Ні
        </button>
      </div>
    </div>
  );
};
