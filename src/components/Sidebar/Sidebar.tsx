import { FC } from "react";
import { AiFillUnlock, AiOutlineDoubleRight } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import {
  BsGearWideConnected,
  BsFillBoxSeamFill,
  BsFillStopwatchFill,
} from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StatisticsView } from "../StatisticsView/StatisticsView";
import { CashAddSubtract } from "./CashAddSubtract/CashAddSubtract";

interface SidebarProps {
  closeSidebar: () => void;
  isTabletOrMobile: boolean;
  updateHeaderTitle: (title: string) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  closeSidebar,
  isTabletOrMobile,
  updateHeaderTitle,
}) => {
  const navItems = [
    {
      to: "/create-sale",
      icon: <FaFileInvoiceDollar />,
      text: "Створити продаж",
    },
    {
      to: "/sales-history",
      icon: <BsFillStopwatchFill />,
      text: "Історія продажів",
    },
    {
      to: "/products-services",
      icon: <BsFillBoxSeamFill />,
      text: "Товари та послуги",
    },
    {
      to: "/products-services",
      icon: <AiFillUnlock />,
      text: "Відкрити зміну",
    },
    {
      to: "/products-services",
      icon: <BsGearWideConnected />,
      text: "Налаштування",
    },
  ];

  const handleNavLinkClick = (text: string) => {
    updateHeaderTitle(text);
    if (isTabletOrMobile) {
      closeSidebar();
    }
  };

  return (
    <div
      className={`w-80 min-h-screen top-0 left-0 bg-base-200 z-10 ${
        isTabletOrMobile ? "absolute" : ""
      }`}
    >
      <ul className="menu p-4 text-base-content gap-2">
        <li className="bg-gray-300 rounded-lg hover:bg-teal-400 transition">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <ImLocation />
                <p className="font-bold text-lg">Форест Україна</p>
              </div>
              <p>Каса 1</p>
            </div>
            <AiOutlineDoubleRight />
          </div>
        </li>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-content hover:bg-teal-100 dark:hover:bg-teal-500 transition"
              onClick={() => handleNavLinkClick(item.text)}
            >
              <div className="flex gap-2 items-center">
                {item.icon}
                <p>{item.text}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <CashAddSubtract />
      <StatisticsView />
    </div>
  );
};
