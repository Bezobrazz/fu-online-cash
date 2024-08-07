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
      <div className="flex justify-between items-center w-full">
        <a href="">Повернутись назад</a>
        <Button
          type="button"
          className="primary-btn block"
          onClick={toggleModal}
        >
          Додати товар
        </Button>
      </div>

      <CardList title="Список товарів" items={products} />
      {isOpenModal && (
        <Modal title="Додавання продукту" toggleModal={toggleModal}>
          <ProductForm toggleModal={toggleModal} />
        </Modal>
      )}
    </section>
  );
};

export default Products;
