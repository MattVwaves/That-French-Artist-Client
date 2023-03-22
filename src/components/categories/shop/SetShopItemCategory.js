import { useState, useEffect } from 'react';
import ShopItemList from './ShopItemList';
import { useNavigate, useLocation } from 'react-router';

export default function SetShopItemCategory({
  category,
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
}) {
  const apiUrl = 'http://localhost:4000';
  const Navigate = useNavigate();
  const Location = useLocation();

  useEffect(() => {
    if (category === 'clothes') {
      fetch(`${apiUrl}/item/shop/?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          const itemsList = data.itemsList;

          const shopItemsWithAddToBasket = itemsList.map((shopItem) => {
            if (
              basketList.find(
                (basketItem) => basketItem.description === shopItem.description
              )
            ) {
              return { ...shopItem, basketStatus: 'Remove from basket' };
            }
            return { ...shopItem, basketStatus: 'Add to basket' };
          });
          setShopItemsList(shopItemsWithAddToBasket);
        });
    }
    if (category === 'patches') {
      Navigate('/shop/patches');
    }
  }, [Location]);

  return (
    <>
      <ShopItemList
        shopItemsList={shopItemsList}
        setShopItemsList={setShopItemsList}
        basketList={basketList}
        setBasketList={setBasketList}
      />
    </>
  );
}
