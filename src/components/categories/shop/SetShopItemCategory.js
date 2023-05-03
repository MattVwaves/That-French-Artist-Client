import { useState, useEffect } from 'react';
import ShopItemList from './ShopItemList';
import { useNavigate, useLocation } from 'react-router';
import BackIcon from '../../functional/back';

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
    if (category) {
      if (category === 'clothes' || category === 'necklaces') {
        fetch(`${apiUrl}/item/shop/?category=${category}`)
          .then((res) => res.json())
          .then((data) => {
            const itemsList = data.itemsList;
            const shopItemsWithAddToBasket = itemsList.map((shopItem) => {
              if (
                basketList &&
                basketList.find(
                  (basketItem) =>
                    basketItem.description === shopItem.description
                )
              ) {
                return { ...shopItem, basketStatus: 'Remove from basket' };
              }
              return { ...shopItem, basketStatus: 'Add to basket' };
            });
            setShopItemsList(shopItemsWithAddToBasket);
            window.localStorage.setItem(
              'shop-items-list',
              JSON.stringify(shopItemsWithAddToBasket)
            );
          });
      }
    }
    if (category === 'patches') {
      Navigate('/shop/patches');
    }
  }, [Location]);

  return (
    <>
      {category && shopItemsList && shopItemsList[0].category === category && (
        <ShopItemList
          category={category}
          shopItemsList={shopItemsList}
          setShopItemsList={setShopItemsList}
          basketList={basketList}
          setBasketList={setBasketList}
        />
      )}
      {category && category === 'other' && (
        <>
          <BackIcon />
          <div className="container-center">Under Construction</div>
        </>
      )}
    </>
  );
}
