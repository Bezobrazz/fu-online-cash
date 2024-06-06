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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <p></p>
      <Input
        name="deposit"
        type="number"
        placeholder="Введіть суму"
        register={register}
        errors={errors}
      />
      <div className="flex gap-5">
        <Button type="button" className="ordinary-btn">
          Закрити
        </Button>
        <Button type="submit" className="primary-btn">
          Зберегти
        </Button>
      </div>
    </form>
  );
};
