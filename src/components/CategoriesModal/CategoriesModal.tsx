import type { Category } from "../../types";

interface CategoriesModalProps {
  categories: Category[];
}
export const CategoriesModal = ({ categories }: CategoriesModalProps) => {
  return (
    <div className="flex flex-col gap-3 w-[300px] min-h-[300px]">
      {categories.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p>Немає категорій</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <li key={category.id} className="hover:bg-slate-400">
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
