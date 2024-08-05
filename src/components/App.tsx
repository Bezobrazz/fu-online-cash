import { Routes, Route } from "react-router-dom";

import { StartScreen, SharedLayout } from "../components";
import CreateSale from "../pages/CreateSale";
import SalesHistory from "../pages/SalesHistory";
import ProductsServices from "../pages/ProductsServices";
import { Cart } from "../pages/Cart";

export const App = () => {
  // getCashboxes().then((res) => {
  //   console.log("cashboxes=>", res);
  // });
  // getEnterprises().then((res) => {
  //   console.log("Enterprises=>", res);
  // });
  // getUsers().then((res) => {
  //   console.log("Users=>", res);
  // });
  // getDocById("cashboxes", "LL5rbj6PbXrFivbeqTSX").then((res) => {
  //   console.log("Doc=>", res);
  // });

  // const salePointRef = doc(db, "salePoints", "NWWaP1hY1f737EfsJWtZ");

  // getDocsByFieldValue("cashboxes", "salePoint", salePointRef).then((res) => {
  //   console.log("CashboxesBySalePointRef=>", res);
  // });

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<StartScreen />} />
        <Route path="create-sale" element={<CreateSale />} />
        <Route path="create-sale/:checkId" element={<CreateSale />} />
        <Route path="sales-history" element={<SalesHistory />} />
        <Route path="products-services" element={<ProductsServices />} />
        <Route path="cart/:checkId" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default App;
