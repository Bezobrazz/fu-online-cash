import React, { FC } from "react";
import { toast } from "react-toastify";

import { Button } from "../../components";

import { useAppDispatch } from "../../hooks";
import { deleteCategory } from "../../redux/categories/categoriesOperations";
import { CategoryState } from "../../types";
import type { Category } from "../../types";

interface DeleteCategoryFormProps {
  activeCategory: Category;
  edit: (state: CategoryState, category: Category | null) => void;
}

export const DeleteCategoryForm: FC<DeleteCategoryFormProps> = ({
  activeCategory,
  edit,
}) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(deleteCategory(activeCategory.id))
      .unwrap()
      .then(() => {
        toast.success(
          `Категорія «${activeCategory.title}» була успішно видалена зі списку.`
        );
        edit(CategoryState.Add, null);
      })
      .catch((error) => {
        toast.error(`Не вдалося видалити категорію: ${error.message}`);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="h-[48px] text-[18px] text-red-600 flex items-center justify-center ">
        <p>Підтвердіть видалення категорії «{activeCategory.title}»</p>
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          className="ordinary-btn flex-1"
          onClick={() => edit(CategoryState.Add, null)}
        >
          Скасувати
        </Button>
        <Button type="submit" className="primary-btn flex-1">
          Видалити
        </Button>
      </div>
    </form>
  );
};
