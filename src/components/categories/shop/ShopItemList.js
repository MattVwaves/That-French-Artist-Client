import { useEffect, useState } from 'react';
import BackIcon from '../../functional/back';
import { useShopContext } from '../../../context/shop';

export default function ShopItemList({
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
}) {
  const [basketId, setBasketId] = useState(localStorage.getItem('basketId'));
  const apiUrl = 'http://localhost:4000';
  const { createFirstBasketItem } = useShopContext();

  const handleCartStatus = async (shopItem) => {
    if (basketId === null) {
      await createFirstBasketItem(
        shopItem,
        shopItemsList,
        setShopItemsList,
        setBasketList,
        setBasketId
      );
      return;
    }
    const foundItem = basketList.find(
      (basketItem) => basketItem.description === shopItem.description
    );
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
      fetch(`${apiUrl}/item/basket/${basketId}`, opts)
        .then((res) => res.json())
        .then((data) => setBasketList([...basketList, data.basketItem]));
    }
    // If item is already in basket delete basket item
    if (foundItem) {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`${apiUrl}/item/basket/${foundItem.id}`, opts);
      const updatedBasketList = basketList.filter(
        (storedItem) => storedItem.id !== foundItem.id
      );
      setBasketList(updatedBasketList);
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
              <li className="category" key={shopItem.id} id="shop-item">
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
