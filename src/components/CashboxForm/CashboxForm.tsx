import { FC, useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { Button, Input } from "..";

import { getUsers } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { cashboxFormSchema } from "../../schemas";
import { addCashbox, editCashbox, selectIsLoadingCashboxes } from "../../redux";
import { Role, type Cashbox, type UserInfo } from "../../types";

interface FormData {
  title: string;
  cash: number;
  employeeId: string;
}

interface CashboxFormProps {
  item?: Cashbox;
  isEdit?: boolean;
  toggleModal: () => void;
}

export const CashboxForm: FC<CashboxFormProps> = ({
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
    resolver: yupResolver(cashboxFormSchema),
  });

  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectIsLoadingCashboxes);

  const [employees, setEmployees] = useState<UserInfo[]>([]);

  useEffect(() => {
    getUsers().then((res) => {
      const filteredUsers = res.filter((elem) => elem.role === Role.Employee);
      setEmployees(filteredUsers);
      if (!filteredUsers.length) {
        setValue("employeeId", "Без працівника");
      }
      if (isEdit) {
        item && setValue("title", item.title);
        item && setValue("cash", item.cash);
        const employee: user = filteredUsers.find(
          (elem) => elem.id === item.employeeId
        );
        item && setValue("employeeId", employee.id);
      }
    });
  }, [isEdit, item, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEdit) {
      const id = item?.id;
      id &&
        dispatch(editCashbox({ id, ...data }))
          .unwrap()
          .then(() => {
            toast.success(`Каса успішно оновлена`);
            reset();
            toggleModal();
          })
          .catch((error) => {
            toast.error(`Не вдалося оновити касу: ${error.message}`);
          });
    } else {
      const newCashbox = {
        ...data,
        card: 0,
        isOpen: false,
        openTime: null,
        closeTime: null,
        salePointId: "12idasidajok31",
      };
      dispatch(addCashbox(newCashbox))
        .unwrap()
        .then(() => {
          toast.success(
            `Каса «${newCashbox.title}» була успішно додана до списку.`
          );
          reset();
          toggleModal();
        })
        .catch((error) => {
          const errorMessage = (error as Error).message || "Unknown error";
          toast.error(`Не вдалося створити касу: ${errorMessage}.`);
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full"
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
      <Button type="submit" className="primary-btn" disabled={isLoading}>
        {isEdit ? "Зберегти" : "Додати касу"}
      </Button>
    </form>
  );
};
