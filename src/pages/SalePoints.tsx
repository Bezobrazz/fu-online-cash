import { useEffect } from "react";

import { Button, CardList, SalePointForm, Modal } from "../components";

import { getSalePoints, selectSalePoints } from "../redux";
import { useAppDispatch, useAppSelector, useModal } from "../hooks";

const SalePoints = () => {
  const dispatch = useAppDispatch();

  const salePoints = useAppSelector(selectSalePoints);

  const [isOpenModal, toggleModal] = useModal();

  useEffect(() => {
    dispatch(getSalePoints());
  }, [dispatch]);
  return (
    <section className="p-5 space-y-4">
      <CardList title="Список торгових точок" items={salePoints} />
      <Button
        type="button"
        className="primary-btn block mx-auto"
        onClick={toggleModal}
      >
        Додати торгову точку
      </Button>
      {isOpenModal && (
        <Modal title="Додавання торгової точки" toggleModal={toggleModal}>
          <SalePointForm toggleModal={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default SalePoints;
