import {
  Button,
  EditCashboxForm,
  EditEmployeeForm,
  EditSalePointForm,
  Modal,
} from "../components";

import { useModal } from "../hooks";

const ProductsServices = () => {
  const [isOpenModal, toggleModal] = useModal();
  const [isOpenCashBoxModal, toggleCashBoxModal] = useModal();
  const [isOpenEmployeeModal, toggleEmployeeModal] = useModal();
  return (
    <div className="flex gap-4 p-4">
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
      <Button
        type="button"
        className="primary-btn"
        onClick={toggleEmployeeModal}
      >
        Створити працівника
      </Button>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <EditSalePointForm toggleModal={toggleModal} />
        </Modal>
      )}
      {isOpenCashBoxModal && (
        <Modal toggleModal={toggleCashBoxModal}>
          <EditCashboxForm toggleModal={toggleCashBoxModal} />
        </Modal>
      )}
      {isOpenEmployeeModal && (
        <Modal toggleModal={toggleEmployeeModal}>
          <EditEmployeeForm toggleModal={toggleEmployeeModal} />
        </Modal>
      )}
    </div>
  );
};
export default ProductsServices;
