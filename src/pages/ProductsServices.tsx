import { FaRegFolder } from "react-icons/fa6";


 const ProductsServices = () => {

  const categories = ["Агроволокно", "Садовий бордюр", "Кора соснова", "Торфи"]
  return (
    <div className="h-screen">
      <ul className="w-28 bg-slate-200 h-full p-2 flex flex-col gap-4 ">
        {categories.map((categorie, index) => (<li key={index} className="flex flex-col items-center justify-items-center">
          <div className="w-20 h-20 rounded-md bg-white flex items-center justify-center"><FaRegFolder/></div>
          <p>{categorie}</p>
        </li>))}
      </ul>
    </div>
  )
}
export default ProductsServices