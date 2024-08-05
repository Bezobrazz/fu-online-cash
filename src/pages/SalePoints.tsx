import { useEffect, useState } from "react";

import { Button, CardList, EditSalePointForm, Modal } from "../components";

import { getSalePoints } from "../firebase";
import { useModal } from "../hooks";

const SalePoints = () => {
  const [salePoints, setSalePoints] = useState([]);

  const [isOpenModal, toggleModal] = useModal();

  useEffect(() => {
    getSalePoints().then((res) => {
      setSalePoints(res);
    });
  }, []);
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
          <EditSalePointForm toggleModal={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default SalePoints;
