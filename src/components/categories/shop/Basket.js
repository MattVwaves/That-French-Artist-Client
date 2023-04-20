import { useState } from 'react';
import BasketItem from './BasketItem';
import Total from './Total';

export default function Basket({
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
  patchQuantity,
  setPatchQuantity,
}) {
  const [displayBasket, setDisplaybasket] = useState(false);
  const basket = JSON.parse(window.localStorage.getItem('basket-list'));

  const handleDisplayBasket = () => {
    setDisplaybasket(!displayBasket);
  };

  return (
    <>
      {displayBasket && (
        <div className="basket-container">
          <h1>BASKET</h1>
          <ul>
            {basket &&
              basket.sort().map((basketItem) => {
                return (
                  <BasketItem
                    shopItemsList={shopItemsList}
                    setShopItemsList={setShopItemsList}
                    basketItem={basketItem}
                    basketList={basketList}
                    setBasketList={setBasketList}
                    patchQuantity={patchQuantity}
                    setPatchQuantity={setPatchQuantity}
                  />
                );
              })}
          </ul>
          <Total basketList={basket} />
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
