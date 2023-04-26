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
    if (category === 'clothes' || category === 'necklaces') {
      fetch(`${apiUrl}/item/shop/?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const itemsList = data.itemsList;

          const shopItemsWithAddToBasket = itemsList.map((shopItem) => {
            if (
              basketList &&
              basketList.find(
                (basketItem) => basketItem.description === shopItem.description
              )
            ) {
              return { ...shopItem, basketStatus: 'Remove from basket' };
            }
            return { ...shopItem, basketStatus: 'Add to basket' };
          });
          setShopItemsList(shopItemsWithAddToBasket);
          console.log(shopItemsList);
          window.localStorage.setItem(
            'shop-items-list',
            JSON.stringify(shopItemsWithAddToBasket)
          );
        });
    }
    if (category === 'patches') {
      Navigate('/shop/patches');
    }
  }, [Location]);

  return (
    <>
      {shopItemsList[0].category === category && (
        <ShopItemList
          category={category}
          shopItemsList={shopItemsList}
          setShopItemsList={setShopItemsList}
          basketList={basketList}
          setBasketList={setBasketList}
        />
      )}
    </>
  );
}
