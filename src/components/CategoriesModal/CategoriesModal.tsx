import React, { useState } from "react";

import { CategoryList } from "./CategoryList";
import type { Category } from "../../types";
import { AddCaterogyForm, EditCaterogyForm } from "..";

interface CategoriesModalProps {
  categories: Category[];
}

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  categories,
}) => {
  const [isEditCategory, setIsEditCategory] = useState<boolean>(false);
  const [categoryForEdit, setCategoryForEdit] = useState<Category | null>(null);

  const editCategory = (state: boolean, category: Category | null) => {
    setIsEditCategory(state);
    setCategoryForEdit(category);
  };

  return (
    <div className="flex flex-col w-[400px]">
      <div className="h-[300px] rounded-md border border-solid border-gray-500 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p>Немає категорій</p>
          </div>
        ) : (
          <CategoryList categories={categories} edit={editCategory} />
        )}
      </div>
      <div className="divider"></div>
      {isEditCategory ? (
        <EditCaterogyForm
          categories={categories}
          edit={editCategory}
          activeCategory={categoryForEdit}
        />
      ) : (
        <AddCaterogyForm categories={categories} />
      )}
    </div>
  );
};
