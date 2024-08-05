import { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import { useAppDispatch } from "../../hooks";
import { addCaterogyFormSchema } from "../../schemas";
import { isTitleUnique } from "../../helpers";
import { addCategory } from "../../redux/categories/categoriesOperations";
import type { Category, NewCategory } from "../../types";

interface FormData {
  title: string;
}

interface AddCaterogyFormProps {
  categories: Category[];
}

export const AddCaterogyForm: FC<AddCaterogyFormProps> = ({ categories }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(addCaterogyFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const enterpriseId = "A0jYCcdJEC1LuairkZnO";

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;

    const categoryToAdd: NewCategory = { title: data.title, enterpriseId };

    if (!isTitleUnique(categories, categoryToAdd.title)) {
      return toast.error("Категорія з такою назвою вже існує");
    }

    setIsSubmitting(true);
    try {
      await dispatch(addCategory(categoryToAdd)).unwrap();
      toast.success(
        `Категорія «${categoryToAdd.title}» була успішно додана до списку.`
      );
      reset();
    } catch (error) {
      const errorMessage = (error as Error).message || "Unknown error";
      toast.error(`Не вдалося створити категорію: ${errorMessage}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        name={"title"}
        placeholder="Введіть назву категорії"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
      />
      <Button type="submit" className="primary-btn">
        Створити
      </Button>
    </form>
  );
};
