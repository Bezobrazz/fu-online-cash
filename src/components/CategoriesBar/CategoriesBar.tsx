import { FaRegFolder } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getCategories, selectCategories } from "../../redux";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { useMediaQuery } from "react-responsive";
import { getProductInitials } from "../../helpers";

export const CategoriesBar = () => {
  const categories = useSelector(selectCategories);
  console.log(categories);
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      {isDesktop ? (
        <ul className="h-full w-full p-3 flex flex-row gap-4 items-center border-b-2 border-slate-200">
          {categories.map((categorie) => (
            <li
              key={categorie.id}
              className="group transition flex items-center gap-2 w-[120px] p-1 cursor-pointer bg-white hover:bg-teal-500 rounded-md border-2 border-slate-200 hover:border-teal-500"
            >
              <div className="w-10 h-10 rounded-full bg-teal-500 group-hover:bg-white flex items-center justify-center self-center">
                <p className="text-white group-hover:text-teal-500">
                  {getProductInitials(categorie.title)}
                </p>
              </div>
              <p className="truncate text-lg text-gray-500 group-hover:text-white">
                {categorie.title}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="w-28 h-full lg:h-full lg:w-full bg-slate-200 p-2 flex flex-col lg:flex-row gap-4 items-center">
          {categories.map((categorie) => (
            <li key={categorie.id} className="flex flex-col w-[90px]">
              <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center self-center">
                <FaRegFolder />
              </div>
              <p className="truncate ml-1 text-lg text-gray-500">
                {categorie.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
