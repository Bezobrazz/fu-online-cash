import React from "react";
import { CategoryListItem } from "./CategoryListItem";
import type { Category } from "../../types";

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <ul className="flex flex-col">
      {categories.map((category) => (
        <CategoryListItem key={category.id} category={category} />
      ))}
    </ul>
  );
};
