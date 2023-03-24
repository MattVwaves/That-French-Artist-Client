import { useEffect, useState } from 'react';

export default function BasketItem({
  shopItemsList,
  setShopItemsList,
  basketItem,
  basketList,
  setBasketList,
  patchQuantity,
  setPatchQuantity,
}) {
  const [customPatchId, setCustomPatchId] = useState(null);

  const setLocalBasket = async (updatedBasketList) => {
    window.localStorage.setItem(
      'basket-list',
      JSON.stringify(updatedBasketList)
    );
  };

  useEffect(() => {
    const customPatchId = localStorage.getItem('custom-patch-id');
    setCustomPatchId(customPatchId);
  });

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

  const handleAddPatch = (basketItem) => {
    if (Number(customPatchId) === basketItem.id) {
      console.log(customPatchId);
      setPatchQuantity(patchQuantity + 1);
    }
    const opts = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quantity: basketItem.quantity + 1,
      }),
    };
    fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts)
      .then((res) => res.json())
      .then((data) => {
        const updatedPatch = data.updatedBasketItem;
        const updatedBasketList = basketList.map((basketItem) => {
          if (basketItem.id === updatedPatch.id) return updatedPatch;
          return basketItem;
        });
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
        const newPatchQuantity = patchQuantity + 1;
        setPatchQuantity(newPatchQuantity);
      });
  };

  const handleRemovePatch = (basketItem) => {
    if (basketItem.quantity > 1) {
      if (Number(customPatchId) === basketItem.id)
        setPatchQuantity(patchQuantity - 1);

      const opts = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          quantity: basketItem.quantity - 1,
        }),
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts)
        .then((res) => res.json())
        .then((data) => {
          const updatedPatch = data.updatedBasketItem;
          const updatedBasketList = basketList.map((basketItem) => {
            if (basketItem.id === updatedPatch.id) return updatedPatch;
            return basketItem;
          });
          setBasketList(updatedBasketList);
          setLocalBasket(updatedBasketList);
          const newPatchQuantity = patchQuantity - 1;
          setPatchQuantity(newPatchQuantity);
        });
    }
    if (basketItem.quantity === 1) {
      if (Number(customPatchId) === basketItem.id) setPatchQuantity(0);

      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts)
        .then((res) => res.json())
        .then((data) => {
          const deletedPatch = data.basketItem;
          const updatedBasketList = basketList.filter((basketItem) => {
            return basketItem.id !== deletedPatch.id;
          });
          setBasketList(updatedBasketList);
          setLocalBasket(updatedBasketList);
          setPatchQuantity(0);
          localStorage.setItem('custom-patch-id', null);
        });
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
