import { useState } from "react";

type UseModalReturnType = [boolean, () => void];

export const useModal = (): UseModalReturnType => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return [isOpenModal, toggleModal];
};
