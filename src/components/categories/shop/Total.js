import { useState, useEffect } from 'react';

export default function Total({ basketList }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    if (basketList) {
      basketList.forEach((basketItem) => {
        const price = basketItem.price.slice(1);
        const quantity = basketItem.quantity;
        const subTotal = price * quantity;
        const subTotalInt = parseFloat(subTotal);

        total += subTotalInt;
      });
    }
    setTotal(total.toFixed(2));
  });

  return <h3>TOTAL: {`£${total}`} </h3>;
}
