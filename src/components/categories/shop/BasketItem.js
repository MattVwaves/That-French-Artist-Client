import { useEffect, useState } from 'react';
import { useShopContext } from '../../../context/shop';

export default function BasketItem({
  shopItemsList,
  setShopItemsList,
  basketItem,
  basketList,
  setBasketList,
  patchQuantity,
  setPatchQuantity,
}) {
  const setLocalBasket = async (updatedBasketList) => {
    window.localStorage.setItem(
      'basket-list',
      JSON.stringify(updatedBasketList)
    );
  };

  const customPatchId = Number(localStorage.getItem('custom-patch-id'));
  const customPatchQuantity = Number(
    localStorage.getItem('custom-patch-quantity')
  );

  const { updateBasketItemPatch, deleteBasketItemPatch } = useShopContext();

  const handleBasketStatus = (e, basketItem) => {
    e.preventDefault();
    const foundItem = basketList.find(
      (storedItem) => basketItem.description === storedItem.description
    );
    if (foundItem) {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts);
      const updatedBasketList = basketList.filter(
        (storedItem) => storedItem.id !== basketItem.id
      );
      setBasketList(updatedBasketList);
      window.localStorage.setItem(
        'basket-list',
        JSON.stringify(updatedBasketList)
      );
    }
    const updatedItemsList = shopItemsList.map((storedItem) => {
      if (storedItem.description === basketItem.description) {
        return { ...storedItem, basketStatus: 'Add to basket' };
      }
      return storedItem;
    });
    setShopItemsList(updatedItemsList);
  };

  const handleAddPatch = async (basketItem) => {
    let quantity;
    let patchId;
    if (basketItem.description.includes('cstm')) {
      if (customPatchId === basketItem.id) {
        patchId = customPatchId;
        quantity = customPatchQuantity + 1;
        localStorage.setItem('custom-patch-quantity', quantity);
      }
      if (customPatchId !== basketItem.id) {
        patchId = basketItem.id;
        quantity = basketItem.quantity + 1;
      }
    }
    await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
  };

  const handleRemovePatch = async (basketItem) => {
    let quantity;
    let patchId;
    if (basketItem.quantity > 1) {
      if (basketItem.description.includes('cstm')) {
        if (customPatchId === basketItem.id) {
          patchId = customPatchId;
          quantity = customPatchQuantity - 1;
          localStorage.setItem('custom-patch-quantity', quantity);
        }
        if (customPatchId !== basketItem.id) {
          patchId = basketItem.id;
          quantity = basketItem.quantity - 1;
        }
      }
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
    }
    if (basketItem.quantity === 1) {
      if (basketItem.description.includes('cstm')) {
        if (customPatchId === basketItem.id) {
          patchId = customPatchId;
          localStorage.setItem('custom-patch-id', null);
          localStorage.setItem('custom-patch-quantity', 0);
        }
        if (customPatchId !== basketItem.id) {
          patchId = basketItem.id;
        }
      }
      await deleteBasketItemPatch(patchId, basketList, setBasketList);
    }
  };

  return (
    <>
      {basketItem.category !== 'patches' && (
        <li key={basketItem.id}>
          <img
            src={require(`../../../assets/shop/clothes/${basketItem.description}.png`)}
            alt="reddress"
            width="50px"
          />
          <span> {basketItem.price}</span>
          <button onClick={(e) => handleBasketStatus(e, basketItem)}>
            Remove from basket
          </button>
        </li>
      )}
      {basketItem.category === 'patches' && (
        <li key={basketItem.id} id="patch-basket-item">
          <p>{basketItem.description}</p>
          <span>{basketItem.price}</span>
          <button onClick={() => handleAddPatch(basketItem)}>+</button>
          <button onClick={() => handleRemovePatch(basketItem)}>-</button>
          <span>{basketItem.quantity}</span>
        </li>
      )}
    </>
  );
}
