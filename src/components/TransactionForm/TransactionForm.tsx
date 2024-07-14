import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Button, Input } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import { depositFormSchema } from "../../schemas";

enum TransactionType {
  deposit = "deposit",
  withdrawal = "withdrawal",
}

interface FormData {
  deposit: number;
}

interface TransactionFormProps {
  type: TransactionType;
  toggleModal: () => void;
}

export const TransactionForm = ({
  type,
  toggleModal,
}: TransactionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(depositFormSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (date) => {
    console.log(date);
    console.log(type);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 py-6 px-7 w-[360px]"
    >
      <p>Поточний залишок в кассі: 777.00 &#8372;</p>
      <Input
        name="deposit"
        type="text"
        placeholder="Введіть суму"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        autocomplete="off"
      />
      <div className="flex justify-between gap-5">
        <Button
          type="button"
          className="ordinary-btn w-1/2"
          onClick={toggleModal}
        >
          Закрити
        </Button>
        <Button type="submit" className="primary-btn w-1/2">
          Зберегти
        </Button>
      </div>
    </form>
  );
};
