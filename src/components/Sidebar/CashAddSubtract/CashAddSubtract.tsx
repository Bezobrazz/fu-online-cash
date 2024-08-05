import { ImArrowDown, ImArrowUp } from "react-icons/im";
export const CashAddSubtract = () => {
  return (
    <ul className="p-4 flex flex-col gap-2">
      <li className="p-2 flex items-center gap-2 border-2 cursor-pointer text-gray-900 rounded-lg dark:text-content hover:bg-teal-100 dark:hover:bg-teal-500 transition">
        <ImArrowUp style={{ color: "green" }} /> <p>Внести готівку</p>
      </li>
      <li className="p-2 flex items-center gap-2 border-2 cursor-pointer text-gray-900 rounded-lg dark:text-content hover:bg-teal-100 dark:hover:bg-teal-500 transition">
        <ImArrowDown style={{ color: "red" }} /> <p>Видати готівку</p>
      </li>
    </ul>
  );
};
