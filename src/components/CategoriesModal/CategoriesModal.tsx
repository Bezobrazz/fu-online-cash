import React from "react";
import { AddCaterogyForm } from "../AddCaterogyForm/AddCaterogyForm";
import { CategoryList } from "./CategoryList";
import type { Category } from "../../types";

interface CategoriesModalProps {
  categories: Category[];
}
export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  categories,
}) => {
  return (
    <div className="flex flex-col w-[400px]">
      <div className="h-[300px] rounded-md border border-solid border-gray-500 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p>Немає категорій</p>
          </div>
        ) : (
          <CategoryList categories={categories} />
        )}
      </div>
      <div className="divider"></div>
      <AddCaterogyForm />
    </div>
  );
};
