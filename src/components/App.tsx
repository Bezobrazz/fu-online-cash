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
  Button,
  DepositForm,
} from "../components";

import { useModal } from "../hooks";
import { Routes, Route } from "react-router-dom";
import CreateSale from "../pages/CreateSale";
import SalesHistory from "../pages/SalesHistory";
import ProductsServices from "../pages/ProductsServices";

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
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<StartScreen />} />
        <Route path="create-sale" element={<CreateSale />} />
        <Route path="sales-history" element={<SalesHistory />} />
        <Route path="products-services" element={<ProductsServices />} />
      </Route>

      {/* <Sidebar />
      <StartScreen />
      {isOpenModal && (
        <Modal toggleModal={toggleModal}>
          {" "}
          <ShiftStartConfirm toggleModal={toggleModal} />
        </Modal>
      )} */}
    </Routes>
  );
};

export default App;
