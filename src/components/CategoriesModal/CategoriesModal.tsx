import { FC, useEffect, useState } from "react";

import { CategoryList } from "./CategoryList";
import { AddCaterogyForm, EditCaterogyForm } from "../../components";

import { CategoryState } from "../../types";
import type { Category } from "../../types";
import { getCategoryStateDescription } from "../../helpers";

interface CategoriesModalProps {
  categories: Category[];
}

export const CategoriesModal: FC<CategoriesModalProps> = ({ categories }) => {
  const [categoryState, setCategoryState] = useState<CategoryState>(
    CategoryState.Add
  );
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string>(
    getCategoryStateDescription(CategoryState.Add)
  );

  useEffect(() => {
    setCurrentTitle(getCategoryStateDescription(categoryState));
  }, [categoryState]);

  const editCategory = (state: CategoryState, category: Category | null) => {
    setCategoryState(state);
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col">
      <div className="h-[300px] rounded-md border border-solid border-gray-500 overflow-y-auto">
        {categories.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p>Немає категорій</p>
          </div>
        ) : (
          <CategoryList categories={categories} edit={editCategory} />
        )}
      </div>
      <div className="divider">{currentTitle}</div>
      {categoryState === CategoryState.Add && (
        <AddCaterogyForm categories={categories} />
      )}
      {categoryState === CategoryState.Edit && (
        <EditCaterogyForm
          categories={categories}
          edit={editCategory}
          activeCategory={activeCategory}
        />
      )}
    </div>
  );
};
