import {
  Button,
  EditCashboxForm,
  EditSalePointForm,
  Modal,
} from "../components";

import { useModal } from "../hooks";

const ProductsServices = () => {
  const [isOpenModal, toggleModal] = useModal();
  const [isOpenCashBoxModal, toggleCashBoxModal] = useModal();
  return (
    <div className="flex gap-4">
      <Button type="button" className="primary-btn" onClick={toggleModal}>
        Створити торгову точку
      </Button>

      <Button
        type="button"
        className="primary-btn"
        onClick={toggleCashBoxModal}
      >
        Створити касу
      </Button>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <EditSalePointForm />
        </Modal>
      )}
      {isOpenCashBoxModal && (
        <Modal toggleModal={toggleCashBoxModal}>
          <EditCashboxForm />
        </Modal>
      )}
    </div>
  );
};
export default ProductsServices;
