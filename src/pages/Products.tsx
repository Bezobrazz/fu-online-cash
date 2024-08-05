import { useEffect, useState } from "react";

import { Button, CardList, Modal, ProductForm } from "../components";

import { getProducts } from "../firebase";
import { useModal } from "../hooks";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [isOpenModal, toggleModal] = useModal();

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <section className="p-5 space-y-4">
      {" "}
      <CardList title="Список продуктів" items={products} />
      <Button
        type="button"
        className="primary-btn block mx-auto"
        onClick={toggleModal}
      >
        Додати продукт
      </Button>
      {isOpenModal && (
        <Modal title="Створення продукту" toggleModal={toggleModal}>
          <ProductForm />
        </Modal>
      )}
    </section>
  );
};

export default Products;
