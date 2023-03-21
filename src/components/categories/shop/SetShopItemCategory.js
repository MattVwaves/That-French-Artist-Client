import { useState, useEffect } from 'react';
import ShopItemList from './ShopItemList';
import { useNavigate } from 'react-router';

export default function SetShopItemCategory({ category }) {
  const apiUrl = 'http://localhost:4000';
  const [shopItemsList, setShopItemsList] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (category === 'clothes') {
      fetch(`${apiUrl}/item/shop/?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
          const itemsList = data.itemsList;
          setShopItemsList(itemsList);
        });
    }
    if (category === 'patches') {
      Navigate('/shop/patches');
    }
  }, [category]);

  return (
    <>
      {shopItemsList && (
        <ul className="container-center shop-item-list" id="category-list">
          <ShopItemList shopItemsList={shopItemsList} />
        </ul>
      )}
    </>
  );
}
