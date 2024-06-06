import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Button, Input } from "..";
import { yupResolver } from "@hookform/resolvers/yup";
import { depositFormSchema } from "../../schemas";

interface FormData {
  deposit: number;
}

export const DepositForm = () => {
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
      />
      <div className="flex justify-between gap-5">
        <Button type="button" className="ordinary-btn w-1/2">
          Закрити
        </Button>
        <Button type="submit" className="primary-btn w-1/2">
          Зберегти
        </Button>
      </div>
    </form>
  );
};
