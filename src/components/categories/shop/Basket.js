import { useState, useEffect } from 'react';
import BasketItem from './BasketItem';
import Total from './Total';
import Payment from './Payment';

export default function Basket({
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
  patchQuantity,
  setPatchQuantity,
}) {
  const [displayBasket, setDisplaybasket] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const basket = JSON.parse(window.localStorage.getItem('basket-list'));
  const apiUrl = 'http://localhost:4000';

  const handleDisplayBasket = () => {
    setDisplaybasket(!displayBasket);
  };

  const handleCheckout = async () => {
    const newBasket = basketList.map((item) => {
      return { ...item, price: item.price.slice(1) };
    });
    await fetch(`${apiUrl}/checkout`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ newBasket }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
          console.log(response.url);
        }
      });
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
          <button onClick={handleCheckout}>Pay</button>
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
