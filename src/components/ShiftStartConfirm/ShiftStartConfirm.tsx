import { Button } from "../../components";

interface ShiftStartConfirmProps {
  toggleModal: () => void;
}

export const ShiftStartConfirm = ({ toggleModal }: ShiftStartConfirmProps) => {
  return (
    <div className="p-8">
      <div className="mb-[20px]">
        <p className="mb-[10px]">
          Ви дійсно бажаєте відкрити зміну касира{" "}
          <span className="font-bold">Костенко В'ячеслав Вікторович</span> на{" "}
          <span className="font-bold">Форест Малехів Каса 1</span>
        </p>
        <p>Каса має залишок:</p>
        <p className="font-bold">710.00₴</p>
      </div>
      <div className="mx-auto md:w-1/2 flex justify-between">
        <Button
          type="button"
          className="bg-teal-600 text-gray-200 font-semibold hover:text-gray-800 hover:bg-teal-300"
        >
          Так
        </Button>
        <Button
          type="button"
          className="font-semibold bg-slate-200 hover:text-gray-200 hover:bg-slate-600"
          onClick={toggleModal}
        >
          Ні
        </Button>
      </div>
    </div>
  );
};
