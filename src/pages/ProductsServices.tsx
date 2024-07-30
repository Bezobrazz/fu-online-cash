import { useModal } from "../hooks";
import { EditSalePointForm, Modal } from "../components";

const ProductsServices = () => {
  const [isOpenModal, toggleModal] = useModal();
  return (
    <>
      <button type="button" className="primary-btn" onClick={toggleModal}>
        Створити підприємство
      </button>
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          <EditSalePointForm />
        </Modal>
      )}
    </>
  );
};
export default ProductsServices;
