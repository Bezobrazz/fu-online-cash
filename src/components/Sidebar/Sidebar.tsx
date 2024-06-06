import { AiFillUnlock } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsGearWideConnected } from "react-icons/bs";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-3">
          {/* Sidebar content here */}
          <li>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start">
                <p className="font-bold text-lg flex items-center gap-2">
                  <ImLocation /> Форест Малехів
                </p>
                <p className="text-sm">Каса 1</p>
              </div>
              <AiOutlineDoubleRight />{" "}
            </div>
          </li>
          <li className="flex align-middle">
            {" "}
            <Link to="create-sale">
              <FaFileInvoiceDollar /> Створити продаж
            </Link>
          </li>
          <li>
            <Link to="sales-history">
              <BsFillStopwatchFill /> Історія Продажів
            </Link>
          </li>
          <li>
            <Link to="products-services">
              <BsFillBoxSeamFill /> Товари / Послуги
            </Link>
          </li>
          <li>
            <a>
              <AiFillUnlock /> Відкрити зміну
            </a>
          </li>
          <li>
            <a>
              <BsGearWideConnected /> Налаштування
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
