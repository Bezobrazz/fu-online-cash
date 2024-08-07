import { useEffect } from "react";

import { Button, CardList, Modal, ProductForm } from "../components";

import { useAppDispatch, useAppSelector, useModal } from "../hooks";
import { getProducts } from "../redux/products/productsOperations";
import { selectProducts } from "../redux/products/productsSlice";
import { getCategories } from "../redux/categories/categoriesOperations";
import { getSalePoints } from "../redux/salePoints/salePointsOperations";

const Products = () => {
  const products = useAppSelector(selectProducts);
  const [isOpenModal, toggleModal] = useModal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSalePoints());
    dispatch(getProducts());
  }, []);

  return (
    <section className="p-5 space-y-4">
      <CardList title="Список товарів" items={products} />
      <Button
        type="button"
        className="primary-btn block mx-auto"
        onClick={toggleModal}
      >
        Додати товар
      </Button>
      {isOpenModal && (
        <Modal title="Додавання продукту" toggleModal={toggleModal}>
          <ProductForm />
        </Modal>
      )}
    </section>
  );
};

export default Products;
