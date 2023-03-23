import { useEffect, useState } from 'react';
import BackIcon from '../../functional/back';

export default function ShopItemList({
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
}) {
  const [basketId, setBasketId] = useState(undefined);
  const apiUrl = 'http://localhost:4000';

  useEffect(() => {
    setBasketId(localStorage.getItem('basketId'));
    if (basketId) {
      fetch(`${apiUrl}/basket/${basketId}`)
        .then((res) => res.json())
        .then((data) => {
          setBasketList(data.basket.basketItems);
        });
    }
  }, [basketList]);
  // If no local basket yet then create basket
  const handleCartStatus = (shopItem) => {
    if (localStorage.getItem('basketId') === null) {
      const opts = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          description: shopItem.description,
          category: shopItem.category,
          price: shopItem.price,
        }),
      };
      fetch(`${apiUrl}/basket`, opts)
        .then((res) => res.json())
        .then((data) => {
          setBasketList(data.basket.basketItems);
          localStorage.setItem('basketId', data.basket.id);
        });
      // update basketStatus of shop item
      const updatedItemsList = shopItemsList.map((storedItem) => {
        if (storedItem.id === shopItem.id)
          return { ...storedItem, basketStatus: 'Remove from basket' };
        return storedItem;
      });
      setShopItemsList(updatedItemsList);
      return;
    }
    // If there is local basket check for item in basket
    const foundItem = basketList.find(
      (basketItem) => basketItem.description === shopItem.description
    );
    // If item isn't in basket create basket item
    if (!foundItem) {
      const opts = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          description: shopItem.description,
          category: shopItem.category,
          price: shopItem.price,
        }),
      };
      fetch(`${apiUrl}/item/basket/${basketId}`, opts);
    }
    // If item is already in basket delete basket item
    if (foundItem) {
      console.log(foundItem);
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`${apiUrl}/item/basket/${foundItem.id}`, opts);
    }
    // Update shop item basket status
    const updatedItemsList = shopItemsList.map((storedItem) => {
      if (
        storedItem.id === shopItem.id &&
        storedItem.basketStatus === 'Add to basket'
      )
        return { ...storedItem, basketStatus: 'Remove from basket' };
      if (
        storedItem.id === shopItem.id &&
        storedItem.basketStatus === 'Remove from basket'
      )
        return { ...storedItem, basketStatus: 'Add to basket' };

      return storedItem;
    });
    setShopItemsList(updatedItemsList);
  };

  return (
    <>
      <BackIcon />
      {shopItemsList && (
        <ul className="container-center shop-item-list" id="category-list">
          {shopItemsList.map((shopItem) => {
            return (
              <li className="category" key={shopItem.id}>
                <img
                  src={require(`../../../assets/shop/clothes/${shopItem.description}.png`)}
                  height="150px"
                  alt="shopItem"
                />
                <div className="adding-removing-items">
                  <span> £20.00</span>
                  <button
                    style={{ backgroundColor: 'white' }}
                    onClick={() => handleCartStatus(shopItem)}
                  >
                    {shopItem.basketStatus}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
