import { FC, useEffect, useState } from "react";

import { CategoryList } from "./CategoryList";
import {
  AddCaterogyForm,
  DeleteCategoryForm,
  EditCaterogyForm,
} from "../../components";

import { getCategoryStateDescription } from "../../helpers";
import { CategoryState } from "../../types";
import type { Category } from "../../types";

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

  const changeCategory = (state: CategoryState, category: Category | null) => {
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
          <CategoryList categories={categories} edit={changeCategory} />
        )}
      </div>
      <div className="divider text-[18px]">{currentTitle}</div>
      {categoryState === CategoryState.Add && (
        <AddCaterogyForm categories={categories} />
      )}
      {categoryState === CategoryState.Edit && activeCategory && (
        <EditCaterogyForm
          categories={categories}
          edit={changeCategory}
          activeCategory={activeCategory}
        />
      )}
      {categoryState === CategoryState.Delete && activeCategory && (
        <DeleteCategoryForm
          edit={changeCategory}
          activeCategory={activeCategory}
        />
      )}
    </div>
  );
};
