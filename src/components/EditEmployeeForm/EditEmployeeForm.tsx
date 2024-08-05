import { FC } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input } from "../../components";

import { editEmployeeFormSchema } from "../../schemas";

interface FormData {
  name: string;
  phone: string;
}

interface EditEmployeeFormProps {
  toggleModal: () => void;
}

export const EditEmployeeForm: FC<EditEmployeeFormProps> = ({
  toggleModal,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(editEmployeeFormSchema),
  });

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
      className="flex flex-col gap-6 py-6 px-7 w-[360px]"
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
        Додати працівника
      </Button>
    </form>
  );
};
