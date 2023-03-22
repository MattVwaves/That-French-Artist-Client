import { useState } from 'react';
import BasketItem from './BasketItem';
import Total from './Total';

export default function Basket({ basketList }) {
  const [displayBasket, setDisplaybasket] = useState(false);

  const handleDisplayBasket = () => {
    setDisplaybasket(!displayBasket);
  };
  return (
    <>
      {displayBasket && (
        <div className="basket-container">
          <h1>BASKET</h1>
          <ul>
            {basketList &&
              basketList.map((basketItem) => {
                return (
                  <BasketItem
                    basketItem={basketItem}
                    // handleBasketStatus={handleBasketStatus}
                    // patchQuantity={patchQuantity}
                    // setPatchQuantity={setPatchQuantity}
                    // patchId={patchId}
                    // setPatchId={setPatchId}
                  />
                );
              })}
          </ul>
          <Total basketList={basketList} />
        </div>
      )}

      <img
        className="basket-icon"
        alt="basket-icon"
        src={require('../../../assets/functional/basket1.png')}
        onClick={() => {
          handleDisplayBasket();
        }}
      ></img>
    </>
  );
}
