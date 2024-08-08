import { useEffect } from "react";

import { Button, CardList, SalePointForm, Modal } from "../components";

import { getSalePoints, selectActiveSalePoints } from "../redux";
import { useAppDispatch, useAppSelector, useModal } from "../hooks";

const SalePoints = () => {
  const dispatch = useAppDispatch();

  const activeSalePoints = useAppSelector(selectActiveSalePoints);

  const [isOpenModal, toggleModal] = useModal();

  useEffect(() => {
    dispatch(getSalePoints());
  }, [dispatch]);

  return (
    <section className="p-5 space-y-4">
      <div className="flex justify-between items-center w-full">
        <a href="">Повернутись назад</a>
        <Button
          type="button"
          className="primary-btn block"
          onClick={toggleModal}
        >
          Додати торгову точку
        </Button>
      </div>
      <CardList title="Список торгових точок" items={activeSalePoints} />

      {isOpenModal && (
        <Modal title="Додавання торгової точки" toggleModal={toggleModal}>
          <SalePointForm toggleModal={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default SalePoints;
