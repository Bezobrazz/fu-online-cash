import { FaRegFolder } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../redux";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";

export const CategoriesBar = () => {
  const categories = useSelector(selectCategories);
  console.log(categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <ul className="w-28 h-full lg:h-full lg:w-full bg-slate-200 p-2 flex flex-col lg:flex-row gap-4 items-center">
        {categories.map((categorie) => (
          <li key={categorie.id} className="flex flex-col w-[90px]">
            <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center self-center">
              <FaRegFolder />
            </div>
            <p className="truncate">{categorie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
