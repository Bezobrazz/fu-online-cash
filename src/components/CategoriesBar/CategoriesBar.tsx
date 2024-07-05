import { FaRegFolder } from "react-icons/fa6";

export const CategoriesBar = () => {
    const categories = ["Агроволокно", "Садовий бордюр", "Кора соснова", "Торфи"]
  return (
    <div>
      <ul className="w-28 h-full lg:h-full lg:w-full bg-slate-200 p-2 flex flex-col lg:flex-row gap-4 items-center">
        {categories.map((categorie, index) => (<li key={index} className="flex flex-col w-[90px]">
          <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center self-center"><FaRegFolder/>
          </div>
           <p className="truncate">{categorie}</p>
         
        </li>))}
      </ul>
    </div>
  )
}
