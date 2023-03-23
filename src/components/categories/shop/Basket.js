import { useState } from 'react';
import BasketItem from './BasketItem';
import Total from './Total';

export default function Basket({
  shopItemsList,
  setShopItemsList,
  basketList,
  patchQuantity,
  setPatchQuantity,
}) {
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
              basketList.sort().map((basketItem) => {
                return (
                  <BasketItem
                    shopItemsList={shopItemsList}
                    setShopItemsList={setShopItemsList}
                    basketItem={basketItem}
                    basketList={basketList}
                    patchQuantity={patchQuantity}
                    setPatchQuantity={setPatchQuantity}
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
