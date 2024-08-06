import { FC, useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input } from "..";

import { employeeFormSchema } from "../../schemas";
import type { UserInfo } from "../../types";

interface FormData {
  name: string;
  phone: string;
}

interface EmployeeFormProps {
  item?: UserInfo;
  isEdit?: boolean;
  toggleModal: () => void;
}

export const EmployeeForm: FC<EmployeeFormProps> = ({
  item,
  isEdit,
  toggleModal,
}) => {
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(employeeFormSchema),
  });

  useEffect(() => {
    if (isEdit) {
      item && setValue("name", item.name);
      item && setValue("phone", item.phone.slice(4));
    }
  }, [isEdit, item, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const employee = {
      ...data,
      phone: `+380${data.phone}`,
      role: "employee",
      enterpriseId: "12idasidajok31",
    };
    console.log(employee);
    reset();
    toggleModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
    >
      <Input
        label="ПІБ:"
        name="name"
        type="text"
        placeholder="Введіть ПІБ працівника"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Input
        label="Номер:"
        name="phone"
        type="tel"
        placeholder="Введіть номер телефону"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        {isEdit ? "Зберегти" : "Додати працівника"}
      </Button>
    </form>
  );
};
