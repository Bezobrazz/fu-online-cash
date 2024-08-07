import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, CardList, CashboxForm, Modal } from "../components";

import { getCashboxes, selectCashboxes } from "../redux";
import { useAppDispatch, useAppSelector, useModal } from "../hooks";

const ProductsServices = () => {
  const dispatch = useAppDispatch();

  const cashboxes = useAppSelector(selectCashboxes);

  const [isOpenCashBoxModal, toggleCashBoxModal] = useModal();

  useEffect(() => {
    dispatch(getCashboxes());
  }, [dispatch]);

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
