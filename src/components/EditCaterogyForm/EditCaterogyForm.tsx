import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input/Input";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { addCaterogyFormSchema } from "../../schemas";
import { Button } from "..";
import React from "react";
import { Category } from "../../types";

interface FormData {
  category: string;
}

interface EditCaterogyFormProps {
  activeCategory: Category | null;
  edit: (state: boolean, category: Category | null) => void;
}

export const EditCaterogyForm: React.FC<EditCaterogyFormProps> = ({
  activeCategory,
  edit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(addCaterogyFormSchema),
  });

  // const dispatch = useAppDispatch();

  const onSubmit = (data: FormData) => {
    // const categoryToUpdate: Category;
    console.log(data);
    edit(false, null);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        name={"category"}
        placeholder="Введіть назву категорії"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
        value={activeCategory ? activeCategory.title : ""}
      />
      <div className="flex gap-4">
        <Button
          type="submit"
          className="ordinary-btn flex-1"
          onClick={() => edit(false, null)}
        >
          Скасувати
        </Button>
        <Button type="submit" className="primary-btn flex-1">
          Змінити назву
        </Button>
      </div>
    </form>
  );
};
