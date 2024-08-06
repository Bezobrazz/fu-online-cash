import { useEffect, useState } from "react";
import { Button, CardList, CashboxForm, Modal } from "../components";

import { useModal } from "../hooks";
import { getCashboxes } from "../firebase";
import { Link } from "react-router-dom";

const ProductsServices = () => {
  const [cashboxes, setCashboxes] = useState([]);

  const [isOpenCashBoxModal, toggleCashBoxModal] = useModal();

  useEffect(() => {
    getCashboxes().then((res) => {
      setCashboxes(res);
    });
  }, []);

  return (
    <>
      <div className="flex gap-4 p-4">
        <Link to="/sale-points">SalePoints</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
      </div>
      <div className="p-8 space-y-5">
        <CardList title="Список кас" items={cashboxes} />
        <Button
          type="button"
          className="primary-btn"
          onClick={toggleCashBoxModal}
        >
          Додати касу
        </Button>
      </div>
      {isOpenCashBoxModal && (
        <Modal title="Додавання каси" toggleModal={toggleCashBoxModal}>
          <CashboxForm toggleModal={toggleCashBoxModal} />
        </Modal>
      )}
    </>
  );
};
export default ProductsServices;
