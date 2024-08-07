import { useNavigate } from "react-router-dom";
import { BiTrashAlt } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";

import {
  CashboxForm,
  EmployeeForm,
  Modal,
  ProductForm,
  SalePointForm,
} from "..";

import { useAppSelector, useModal } from "../../hooks";
import { type CardListItemType, Role } from "../../types";
import {
  isCashbox,
  isProduct,
  isSalePoint,
  isUserInfo,
  getTitle,
  getSalePointInfoById,
} from "../../helpers";
import { selectSalePoints } from "../../redux/salePoints/salePointsSlice";

interface CardListItemProps {
  item: CardListItemType;
}

export const CardListItem = ({ item }: CardListItemProps) => {
  const navigate = useNavigate();

  const [isOpenModal, toggleModal] = useModal();

  const salePoints = useAppSelector(selectSalePoints);

  if (isUserInfo(item)) {
    item.phone = "+380960700684";
  }

  const handleNavigate = () => {
    if (isSalePoint(item)) {
      navigate(`/sale-points/${item.id}`);
    }
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    toggleModal();
  };

  const itemContent = () => {
    if (isUserInfo(item)) {
      return (
        <>
          <p
            className={item.role === Role.Owner ? "font-bold text-[22px]" : ""}
          >
            {item.name}
          </p>
          <a href={`tel:${item.phone}`}>{item.phone}</a>
        </>
      );
    }
    if (isCashbox(item)) return <p>{item.title}</p>;
    if (isProduct(item)) {
      const salePointInfo = getSalePointInfoById(salePoints, item.salePointId);

      return (
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-[18px]">{item.name}</h3>
          <div>
            <p>Ціна: {item.price} &#8372;</p>
            <p>Залишок: {item.quantity} шт.</p>
            <div className="flex flex-row gap-2">
              <span className="py-0.5 px-2 bg-slate-300 rounded-md">
                {item.category}
              </span>
              {salePointInfo && (
                <span className="py-0.5 px-2 bg-slate-300 rounded-md">
                  {salePointInfo.title}
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (isSalePoint(item)) return <p>{item.title}</p>;
    return null;
  };

  const renderModalContent = () => {
    if (isUserInfo(item))
      return <EmployeeForm toggleModal={toggleModal} item={item} isEdit />;
    if (isSalePoint(item))
      return <SalePointForm toggleModal={toggleModal} item={item} isEdit />;
    if (isCashbox(item))
      return <CashboxForm toggleModal={toggleModal} item={item} isEdit />;
    if (isProduct(item))
      return <ProductForm toggleModal={toggleModal} item={item} isEdit />;
    return null;
  };

  const itemStyle = `p-5 flex justify-between items-center 
           ${
             isUserInfo(item) || isProduct(item)
               ? "bg-transparent border-b border-black text-black"
               : "bg-teal-500 rounded-md text-white"
           } ${isSalePoint(item) && "cursor-pointer"}`;

  return (
    <>
      <li className={itemStyle} onClick={handleNavigate}>
        <div>{itemContent()}</div>
        <div className="space-x-1.5">
          <button type="button" onClick={handleEditClick}>
            <FaRegEdit className="size-5" />
          </button>
          <button type="button">
            <BiTrashAlt className=" size-5" />
          </button>
        </div>
      </li>
      {isOpenModal && (
        <Modal
          title={getTitle(item)}
          toggleModal={() => {
            toggleModal();
          }}
        >
          {renderModalContent()}
        </Modal>
      )}
    </>
  );
};
