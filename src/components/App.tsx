import {
  getCashboxes,
  getEnterprises,
  getSalePoints,
  getUsers,
} from "../firebase/firebaseService";

import {
  ShiftStartConfirm,
  Modal,
  StartScreen,
  Sidebar,
  SharedLayout,
} from "../components";

import { useModal } from "../hooks";

export const App = () => {
  const [isOpenModal, toggleModal] = useModal();

  getCashboxes().then((res) => {
    console.log("cashboxes=>", res);
  });
  getEnterprises().then((res) => {
    console.log("Enterprises=>", res);
  });
  getSalePoints().then((res) => {
    console.log("SalePoints=>", res);
  });
  getUsers().then((res) => {
    console.log("Users=>", res);
  });

  return (
    <>
      <SharedLayout />
      <h1>Online Cash App</h1>
      {/* <Sidebar />
      <StartScreen />
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          {" "}
          <ShiftStartConfirm toggleModal={toggleModal} />
        </Modal>
      )} */}
    </>
  );
};

export default App;
