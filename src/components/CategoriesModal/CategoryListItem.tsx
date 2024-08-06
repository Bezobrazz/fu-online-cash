import { FC } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

import { CategoryState } from "../../types";
import { isItemUnique } from "../../helpers";
import { useAppSelector } from "../../hooks";
import { selectProducts } from "../../redux/products/productsSlice";

import type { Category } from "../../types";

interface CategoryListItemProps {
  category: Category;
  edit: (state: CategoryState, category: Category | null) => void;
}

export const CategoryListItem: FC<CategoryListItemProps> = ({
  category,
  edit,
}) => {
  const handleEditCategory = (category: Category) => {
    edit(CategoryState.Edit, category);
  };

  const products = useAppSelector(selectProducts);

  const handleDeleteCategory = (category: Category) => {
    if (!isItemUnique(products, category.title, "category")) {
      toast.error(
        `Неможливо видалити категорію, оскільки існуть продукти з такою категорією.`
      );
      return;
    }

    edit(CategoryState.Delete, category);
  };

  return (
    <li
      key={category.id}
      className="flex justify-between hover:bg-gray-300 px-2.5 py-1.5 cursor-pointer group"
    >
      <p>{category.title}</p>
      <div className="space-x-1.5">
        <button type="button" onClick={() => handleEditCategory(category)}>
          <FaRegEdit className="invisible group-hover:visible size-5" />
        </button>
        <button type="button" onClick={() => handleDeleteCategory(category)}>
          <BiTrashAlt className="invisible group-hover:visible size-5" />
        </button>
      </div>
    </li>
  );
};
