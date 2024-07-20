import React from "react";
import type { Category } from "../../types";
import { AddCaterogyForm } from "../AddCaterogyForm/AddCaterogyForm";
import { BiTrashAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

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
          <ul className="flex flex-col">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between hover:bg-gray-300 px-2.5 py-1.5 cursor-pointer group"
              >
                <p>{category.title}</p>
                <div className="space-x-1.5">
                  <button type="button">
                    <FaRegEdit className="invisible group-hover:visible size-5" />
                  </button>
                  <button type="button">
                    <BiTrashAlt className="invisible group-hover:visible size-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="divider"></div>
      <AddCaterogyForm />
    </div>
  );
};
