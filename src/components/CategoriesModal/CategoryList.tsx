import { FC } from "react";

import { CategoryListItem } from "./CategoryListItem";

import { CategoryState } from "../../types";
import type { Category } from "../../types";

interface CategoryListProps {
  categories: Category[];
  edit: (state: CategoryState, category: Category | null) => void;
}

export const CategoryList: FC<CategoryListProps> = ({ categories, edit }) => {
  return (
    <ul className="flex flex-col">
      {categories.map((category) => (
        <CategoryListItem key={category.id} category={category} edit={edit} />
      ))}
    </ul>
  );
};
