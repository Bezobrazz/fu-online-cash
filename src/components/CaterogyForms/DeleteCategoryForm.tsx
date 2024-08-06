import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "../../components";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteCategory } from "../../redux/categories/categoriesOperations";
import { CategoryState } from "../../types";
import type { Category } from "../../types";
import { isItemUnique } from "../../helpers";
import { selectProducts } from "../../redux/products/productsSlice";

interface DeleteCategoryFormProps {
  activeCategory: Category;
  edit: (state: CategoryState, category: Category | null) => void;
}

export const DeleteCategoryForm: FC<DeleteCategoryFormProps> = ({
  activeCategory,
  edit,
}) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [isCategoryDeletable, setIsCategoryDeletable] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCategoryDeletable(
      isItemUnique(products, activeCategory.title, "category")
    );
  }, [activeCategory]);

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
      <div className="h-[48px] text-[18px] text-red-600 flex items-center justify-center">
        {isCategoryDeletable ? (
          <p>Підтвердіть видалення категорії «{activeCategory.title}»</p>
        ) : (
          <p className="text-center">
            Неможливо видалити категорію, оскільки існуть продукти з такою
            категорією.
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <Button
          type="submit"
          className="ordinary-btn flex-1"
          onClick={() => edit(CategoryState.Add, null)}
        >
          Скасувати
        </Button>
        <Button
          type="submit"
          className={`primary-btn flex-1 ${
            !isCategoryDeletable && "cursor-not-allowed"
          }`}
          disabled={!isCategoryDeletable}
        >
          Видалити
        </Button>
      </div>
    </form>
  );
};
