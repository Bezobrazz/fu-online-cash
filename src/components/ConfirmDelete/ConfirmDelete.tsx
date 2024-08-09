import { useState } from "react";
import { toast } from "react-toastify";

import { Button, Modal } from "../../components";

import { useAppDispatch } from "../../hooks";
import { deactivateSalePoint, deleteCashbox } from "../../redux";
import { isCashbox, isProduct, isSalePoint, isUserInfo } from "../../helpers";
import type { CardListItemType } from "../../types";

interface ConfirmDeleteProps {
  item: CardListItemType;
  toggleModal: () => void;
}

type ThunkAction = ReturnType<
  typeof deleteCashbox | typeof deactivateSalePoint
>;

export const ConfirmDelete = ({ item, toggleModal }: ConfirmDeleteProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAction = (
    deleteAction: ThunkAction,
    successMessage: string,
    itemName: string
  ) => {
    setIsLoading(true);
    dispatch(deleteAction)
      .unwrap()
      .then(() => {
        toast.success(successMessage);
        toggleModal();
      })
      .catch((error) => {
        const errorMessage = (error as Error).message || "Unknown error";
        toast.error(`Не вдалося видалити ${itemName}: ${errorMessage}.`);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = () => {
    if (isUserInfo(item)) {
      console.log("delete user");
      return;
    }
    if (isCashbox(item)) {
      handleDeleteAction(
        deleteCashbox(item.id),
        `Каса «${item.title}» була успішно видалена зі списку.`,
        "касу"
      );
    }
    if (isProduct(item)) {
      console.log("delete product");
    }
    if (isSalePoint(item)) {
      handleDeleteAction(
        deactivateSalePoint(item.id),
        `Торгова точка «${item.title}» була успішно видалена зі списку.`,
        "торгову точку"
      );
    }
  };

  const getItemTitle = (item: CardListItemType): string => {
    if (isUserInfo(item) || isProduct(item)) {
      return item.name;
    } else if (isCashbox(item) || isSalePoint(item)) {
      return item.title;
    }
    return "";
  };
  const title = getItemTitle(item);

  return (
    <Modal title="Видалення" toggleModal={toggleModal}>
      <p className="text-[18px] mb-[10px] h-[100px] flex items-center justify-center">
        Ви дійсно бажаєте видалити «{title}
        »?
      </p>
      <div className="flex justify-between">
        <Button type="button" className="ordinary-btn " onClick={toggleModal}>
          Ні
        </Button>
        <Button
          type="button"
          className="primary-btn "
          onClick={handleDelete}
          disabled={isLoading}
        >
          Так
        </Button>
      </div>
    </Modal>
  );
};
