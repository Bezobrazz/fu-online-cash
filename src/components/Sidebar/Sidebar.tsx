import { FaStore } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FC } from "react";
import { AiFillUnlock, AiOutlineDoubleRight } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsFillBoxSeamFill, BsFillStopwatchFill } from "react-icons/bs";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StatisticsView } from "../StatisticsView/StatisticsView";
import { CashAddSubtract } from "./CashAddSubtract/CashAddSubtract";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../redux/auth/authSlice";
import { Role } from "../../types";
import { useModal } from "../../hooks";
import { Modal } from "../Modal/Modal";
import { ShiftStartConfirm } from "../ShiftStartConfirm/ShiftStartConfirm";
import {
  TransactionForm,
  TransactionType,
} from "../TransactionForm/TransactionForm";

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
  const [isOpenModal, toggleModal] = useModal();
  const [isOpenModalDeposit, toggleModalDeposit] = useModal();
  const [isOpenModalWithdraw, toggleModalWithdraw] = useModal();

  const userInfo = useSelector(selectUserInfo);
  console.log(userInfo.role);

  const isOwner = userInfo.role === Role.Owner;

  // const isEmployee = userInfo.role === Role.Employee;

  // const isAdmin = userInfo.role === Role.Admin;

  const navItems = [
    {
      to: "/create-sale",
      icon: <FaFileInvoiceDollar />,
      text: "Створити продаж",
      condition: true,
    },
    {
      to: "#",
      icon: <AiFillUnlock />,
      text: "Відкрити зміну",
      condition: true,
      action: () => toggleModal(),
    },
    {
      to: "/sales-history",
      icon: <BsFillStopwatchFill />,
      text: "Історія продажів",
      condition: isOwner ? true : false,
    },
    {
      to: "/products",
      icon: <BsFillBoxSeamFill />,
      text: "Товари",
      condition: isOwner ? true : false,
    },
    {
      to: "/sale-points",
      icon: <FaStore />,
      text: "Торгові точки",
      condition: isOwner ? true : false,
    },
    {
      to: "/users",
      icon: <FaUsers />,
      text: "Користувачі",
      condition: isOwner ? true : false,
    },
  ];

  const handleNavLinkClick = (text: string, action?: () => void) => {
    updateHeaderTitle(text);
    if (isTabletOrMobile) {
      closeSidebar();
    }
    if (action) {
      action();
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
        {navItems
          .filter((item) => item.condition)
          .map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="flex items-center p-2 text-base text-neutral font-normal text-gray-900 rounded-lg dark:text-content hover:bg-teal-100 dark:hover:bg-teal-500 transition"
                onClick={() => handleNavLinkClick(item.text, item.action)}
              >
                <div className="flex gap-2 items-center">
                  {item.icon}
                  <p>{item.text}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <CashAddSubtract
        toggleModalDeposit={toggleModalDeposit}
        toggleModalWithdraw={toggleModalWithdraw}
      />
      <StatisticsView />
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <ShiftStartConfirm toggleModal={toggleModal} />
        </Modal>
      )}
      {isOpenModalDeposit && (
        <Modal toggleModal={toggleModalDeposit}>
          <TransactionForm
            toggleModal={toggleModalDeposit}
            type={TransactionType.deposit}
          />
        </Modal>
      )}
      {isOpenModalWithdraw && (
        <Modal toggleModal={toggleModalWithdraw}>
          <TransactionForm
            toggleModal={toggleModalWithdraw}
            type={TransactionType.withdrawal}
          />
        </Modal>
      )}
    </div>
  );
};
