import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "..";

export const DepositForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FieldValues> = (date) => {
    console.log(date);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 py-6 px-7 w-[360px]"
    >
      <p>Поточний залишок в кассі: 777.00 &#8372;</p>
      <Input
        name="deposit"
        type="number"
        placeholder="Введіть суму"
        register={register}
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
