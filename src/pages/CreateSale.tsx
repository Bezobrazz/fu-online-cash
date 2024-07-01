import { Button, DepositForm, Modal } from "../components";
import { useModal } from "../hooks";

const CreateSale = () => {
  const [isOpenModal, toggleModal] = useModal();
  return (
    <>
      <h2>Create Sale</h2>
      {isOpenModal && (
        <Modal toggleModal={toggleModal} title="Внести готівку">
          {/* <ShiftStartConfirm toggleModal={toggleModal} /> */}
          <DepositForm toggleModal={toggleModal} />
        </Modal>
      )}
      <Button type="button" className="ordinary-btn" onClick={toggleModal}>
        Open Modal
      </Button>
    </>
  );
};

export default CreateSale;
