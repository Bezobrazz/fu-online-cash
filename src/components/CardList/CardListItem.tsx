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

import { useModal } from "../../hooks";
import { type CardListItemType, Role } from "../../types";
import {
  isCashbox,
  isProduct,
  isSalePoint,
  isUserInfo,
  getTitle,
} from "../../helpers";

interface CardListItemProps {
  item: CardListItemType;
}
export const CardListItem = ({ item }: CardListItemProps) => {
  const navigate = useNavigate();

  const [isOpenModal, toggleModal] = useModal();

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
    if (isProduct(item)) return <p>{item.name}</p>;
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
    if (isProduct(item)) return <ProductForm />;
    return null;
  };

  const itemStyle = `p-5 flex justify-between items-center 
           ${
             isUserInfo(item)
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
