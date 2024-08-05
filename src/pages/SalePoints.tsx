import { useEffect, useState } from "react";

import { CardList } from "../components";

import { getSalePoints } from "../firebase";

const SalePoints = () => {
  const [salePoints, setSalePoints] = useState([]);

  useEffect(() => {
    getSalePoints().then((res) => {
      setSalePoints(res);
    });
  }, []);
  return (
    <section className="p-5">
      <CardList title="Список торгових точок" items={salePoints} />
    </section>
  );
};

export default SalePoints;
