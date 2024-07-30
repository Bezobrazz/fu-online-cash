import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input } from "../../components";

import { getUsers } from "../../firebase";
import { editCashboxFormSchema } from "../../schemas";

interface FormData {
  title: string;
  cash: number;
  employee: string;
}
export const EditCashboxForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(editCashboxFormSchema),
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getUsers().then((res) => {
      const filteredUsers = res.filter((elem) => elem.role === "user");
      setEmployees(filteredUsers);
      console.log("Працівники:", filteredUsers);
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const cashbox = { ...data, salePointId: "12idasidajok31" };
    console.log(cashbox);
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 py-6 px-7 w-[360px]"
    >
      <p>Назва:</p>
      <Input
        name="title"
        type="text"
        placeholder="Введіть назву каси"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <p>Готівка:</p>
      <Input
        name="cash"
        type="number"
        placeholder="Введіть суму готівки"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <p>Працівник:</p>
      <Input
        name="employee"
        type="text"
        placeholder="Виберіть працівника"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        Додати касу
      </Button>
    </form>
  );
};
