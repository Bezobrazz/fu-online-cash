import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../Input/Input";
import { FieldValues, UseFormRegister, useForm } from "react-hook-form";
import { addCaterogyFormSchema } from "../../schemas";
import { Button } from "..";
import React, { useEffect } from "react";
import { Category } from "../../types";
import { isTitleUnique } from "../../helpers/isTitleUnique";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks";
import { editCategory } from "../../redux/categories/categoriesOperations";

interface FormData {
  category: string;
}

interface EditCaterogyFormProps {
  categories: Category[];
  activeCategory: Category | null;
  edit: (state: boolean, category: Category | null) => void;
}

export const EditCaterogyForm: React.FC<EditCaterogyFormProps> = ({
  categories,
  activeCategory,
  edit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(addCaterogyFormSchema),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeCategory) {
      setValue("category", activeCategory.title);
    }
  }, [activeCategory, setValue]);

  const onSubmit = (data: FormData) => {
    const title = data.category;

    if (!isTitleUnique(categories, title)) {
      return toast.error("Категорія з такою назвою вже існує");
    }

    if (activeCategory) {
      dispatch(editCategory({ id: activeCategory.id, title }))
        .unwrap()
        .then(() => {
          toast.success(`Категорія "${title}" успішно оновлена`);
          reset();
          edit(false, null);
        })
        .catch((error) => {
          toast.error(`Не вдалося оновити категорію: ${error.message}`);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        name={"category"}
        placeholder="Введіть назву категорії"
        register={register as unknown as UseFormRegister<FieldValues>}
        errors={errors}
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
          Зберегти зміни
        </Button>
      </div>
    </form>
  );
};
