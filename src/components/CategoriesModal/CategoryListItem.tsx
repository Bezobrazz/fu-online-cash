import { FC } from "react";
import { toast } from "react-toastify";
import { BiTrashAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

import { useAppDispatch } from "../../hooks";
import { deleteCategory } from "../../redux/categories/categoriesOperations";
import { CategoryState } from "../../types";
import type { Category } from "../../types";

interface CategoryListItemProps {
  category: Category;
  edit: (state: CategoryState, category: Category | null) => void;
}

export const CategoryListItem: FC<CategoryListItemProps> = ({
  category,
  edit,
}) => {
  const dispatch = useAppDispatch();

  const handleDeleteCategory = (category: Category) => {
    dispatch(deleteCategory(category.id))
      .unwrap()
      .then(() => {
        toast.success(
          `Категорія «${category.title}» була успішно видалена зі списку.`
        );
        edit(CategoryState.Add, null);
      })
      .catch((error) => {
        toast.error(`Не вдалося видалити категорію: ${error.message}`);
      });
  };

  const editCategoryTitle = (category: Category) => {
    edit(CategoryState.Edit, category);
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
        <button type="button" onClick={() => handleDeleteCategory(category)}>
          <BiTrashAlt className="invisible group-hover:visible size-5" />
        </button>
      </div>
    </li>
  );
};
