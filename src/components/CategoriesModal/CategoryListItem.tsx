import React from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { deleteCategoryById } from "../../redux/categories/categoriesOperations";
import { useAppDispatch } from "../../hooks";
import type { Category } from "../../types";

interface CategoryListItemProps {
  category: Category;
  edit: (state: boolean, category: Category | null) => void;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  edit,
}) => {
  const dispatch = useAppDispatch();

  const deleteCategory = (id: string) => {
    dispatch(deleteCategoryById(id));
    edit(false, null);
  };

  const editCategoryTitle = (category: Category) => {
    edit(true, category);
  };

  return (
    <li
      key={category.id}
      className="flex justify-between hover:bg-gray-300 px-2.5 py-1.5 cursor-pointer group"
    >
      <p>{category.title}</p>
      <div className="space-x-1.5">
        <button type="button" onClick={() => editCategoryTitle(category)}>
          <FaRegEdit className="invisible group-hover:visible size-5" />
        </button>
        <button type="button" onClick={() => deleteCategory(category.id)}>
          <BiTrashAlt className="invisible group-hover:visible size-5" />
        </button>
      </div>
    </li>
  );
};
