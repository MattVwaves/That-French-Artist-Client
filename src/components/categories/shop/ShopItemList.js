import { useState, useEffect } from 'react';
import BackIcon from '../../functional/back';
import { useShopContext } from '../../../context/shop';

export default function ShopItemList({
  category,
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
}) {
  const [basketId, setBasketId] = useState(
    window.localStorage.getItem('basketId')
  );
  const {
    createFirstBasketItem,
    createBasketItem,
    deleteBasketItem,
    updateShopItemsList,
  } = useShopContext();

  useEffect(() => {
    console.log(category);
  });

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
      await createBasketItem(shopItem, basketId, setBasketList, basketList);
    }

    if (foundItem) {
      await deleteBasketItem(foundItem, basketList, setBasketList);
    }

    updateShopItemsList(shopItem, shopItemsList, setShopItemsList);
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
                  src={require(`../../../assets/shop/${category}/${shopItem.description}.png`)}
                  height="150px"
                  alt="shopItem"
                />
                <div className="adding-removing-items">
                  <span> {shopItem.price}</span>
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
