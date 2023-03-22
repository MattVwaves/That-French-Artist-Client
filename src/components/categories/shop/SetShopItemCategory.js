import { useState, useEffect } from 'react';
import ShopItemList from './ShopItemList';
import { useNavigate } from 'react-router';

export default function SetShopItemCategory({
  category,
  basketList,
  setBasketList,
}) {
  const apiUrl = 'http://localhost:4000';
  const [shopItemsList, setShopItemsList] = useState([]);
  const Navigate = useNavigate();

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
  });

  return (
    <>
      {shopItemsList && (
        <ul className="container-center shop-item-list" id="category-list">
          <ShopItemList
            shopItemsList={shopItemsList}
            basketList={basketList}
            setBasketList={setBasketList}
          />
        </ul>
      )}
    </>
  );
}
