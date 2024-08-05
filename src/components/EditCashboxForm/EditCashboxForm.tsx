import { FC, useEffect, useState } from "react";
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
import { Role, UserInfo } from "../../types";

interface FormData {
  title: string;
  cash: number;
  employeeId: string;
}

interface EditCashboxFormProps {
  toggleModal: () => void;
}

export const EditCashboxForm: FC<EditCashboxFormProps> = ({ toggleModal }) => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(editCashboxFormSchema),
  });

  const [employees, setEmployees] = useState<UserInfo>();

  useEffect(() => {
    getUsers().then((res) => {
      const filteredUsers = res.filter((elem) => elem.role === Role.Employee);
      setEmployees(filteredUsers);
      if (!filteredUsers.length) {
        setValue("employeeId", "Без працівника");
      }
    });
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const cashbox = {
      ...data,
      card: 0,
      isOpen: false,
      openTime: null,
      closeTime: null,
      salePointId: "12idasidajok31",
    };
    console.log(cashbox);
    reset();
    toggleModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 py-6 px-7 w-[360px]"
    >
      <Input
        label="Назва:"
        name="title"
        type="text"
        placeholder="Введіть назву каси"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Input
        label="Готівка:"
        name="cash"
        type="number"
        placeholder="Введіть суму готівки"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <div className="flex flex-col gap-1.5 flex-1 relative">
        <label className="label">
          Працівник:
          <select
            className="select w-full field"
            disabled={!employees.length}
            {...register("employeeId")}
          >
            <option
              value={employees.length ? "" : "Без працівника"}
              disabled={Boolean(employees.length)}
            >
              {employees.length ? "Виберіть працівника" : "Без працівника"}
            </option>
            {employees.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        {(errors.employeeId?.message as string | undefined) && (
          <p className="field-error bottom-[-20px]">
            {errors.employeeId?.message}
          </p>
        )}
      </div>
      <Button type="submit" className="primary-btn">
        Додати касу
      </Button>
    </form>
  );
};
