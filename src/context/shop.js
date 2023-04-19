import { createContext, useContext } from 'react';

const ShopContext = createContext();
const apiUrl = 'http://localhost:4000';

const ShopProvider = ({ children }) => {
  const getBasket = async (basketId, setBasketList) => {
    await fetch(`http://localhost:4000/basket/${basketId}`)
      .then((res) => res.json())
      .then((data) => setBasketList(data.basket.basketItems));
  };

  const setLocalBasket = async (updatedBasketList) => {
    window.localStorage.setItem(
      'basket-list',
      JSON.stringify(updatedBasketList)
    );
  };

  const patchType = async (description, patchId) => {
    if (description.includes('cstm'))
      window.localStorage.setItem('custom-patch-id', patchId);
    if (description.includes('rndm-small'))
      window.localStorage.setItem('random-patch-small-id', patchId);
    if (description.includes('rndm-large'))
      window.localStorage.setItem('random-patch-large-id', patchId);
  };

  const opts = (shopItem) => {
    return {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        description: shopItem.description,
        category: shopItem.category,
        price: shopItem.price,
      }),
    };
  };

  const patchOpts = (description, category, price) => {
    return {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        description,
        category,
        price,
      }),
    };
  };

  const patchOptsUpdate = (quantity) => {
    return {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quantity,
      }),
    };
  };

  const createFirstBasketItemPatch = async (
    description,
    category,
    price,
    setBasketList,
    setBasketId,
    setPatchId
  ) => {
    await fetch(`${apiUrl}/basket`, patchOpts(description, category, price))
      .then((res) => res.json())
      .then((data) => {
        const patchId = data.basket.basketItems[0].id;
        const updatedBasketList = data.basket.basketItems;
        setBasketList(updatedBasketList);
        window.localStorage.setItem('basketId', data.basket.id);
        setLocalBasket(updatedBasketList);
        setBasketId(data.basket.id);
        patchType(description, patchId);
        // setPatchId(patchId);
      });
    return;
  };

  const createFirstBasketItem = async (
    shopItem,
    shopItemsList,
    setShopItemsList,
    setBasketList,
    setBasketId
  ) => {
    await fetch(`${apiUrl}/basket`, opts(shopItem))
      .then((res) => res.json())
      .then((data) => {
        const updatedBasketList = data.basket.basketItems;
        setBasketList(updatedBasketList);
        window.localStorage.setItem('basketId', data.basket.id);
        setLocalBasket(updatedBasketList);
        setBasketId(data.basket.id);
      });
    const updatedItemsList = shopItemsList.map((storedItem) => {
      if (storedItem.id === shopItem.id)
        return { ...storedItem, basketStatus: 'Remove from basket' };
      return storedItem;
    });
    setShopItemsList(updatedItemsList);
    return;
  };

  const createBasketItemPatch = async (
    description,
    category,
    price,
    basketId,
    setBasketList,
    basketList,
    setPatchId
  ) => {
    await fetch(
      `${apiUrl}/item/basket/${Number(basketId)}`,
      patchOpts(description, category, price)
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(basketList);
        const updatedBasketList = [...basketList, data.basketItem];
        const patchId = data.basketItem.id;
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
        patchType(description, patchId);
        // setPatchId(data.basketItem.id);
      });
  };

  const updateBasketItemPatch = async (
    quantity,
    patchId,
    basketList,
    setBasketList
  ) => {
    console.log(patchId);
    await fetch(
      `http://localhost:4000/item/basket/${patchId}`,
      patchOptsUpdate(quantity)
    )
      .then((res) => res.json())
      .then((data) => {
        const updatedPatch = data.updatedBasketItem;
        const updatedBasketList = basketList.map((basketItem) => {
          if (basketItem.id === updatedPatch.id) return updatedPatch;
          return basketItem;
        });
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
      });
  };

  const deleteBasketItemPatch = async (patchId, basketList, setBasketList) => {
    const opts = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    };
    await fetch(`http://localhost:4000/item/basket/${patchId}`, opts)
      .then((res) => res.json())
      .then((data) => {
        const deletedPatch = data.basketItem;
        const updatedBasketList = basketList.filter((basketItem) => {
          return basketItem.id !== deletedPatch.id;
        });
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
      });
  };

  const createBasketItem = async (
    shopItem,
    basketId,
    setBasketList,
    basketList
  ) => {
    await fetch(`${apiUrl}/item/basket/${Number(basketId)}`, opts(shopItem))
      .then((res) => res.json())
      .then((data) => {
        const updatedBasketList = [...basketList, data.basketItem];
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
      });
  };

  const deleteBasketItem = async (foundItem, basketList, setBasketList) => {
    const opts = {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' },
    };
    fetch(`${apiUrl}/item/basket/${foundItem.id}`, opts);
    const updatedBasketList = basketList.filter(
      (storedItem) => storedItem.id !== foundItem.id
    );
    setBasketList(updatedBasketList);
    setLocalBasket(updatedBasketList);
  };

  const updateShopItemsList = async (
    shopItem,
    shopItemsList,
    setShopItemsList
  ) => {
    const updatedShopItemsList = shopItemsList.map((storedItem) => {
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
    setShopItemsList(updatedShopItemsList);
  };

  const value = {
    getBasket,
    createFirstBasketItemPatch,
    createFirstBasketItem,
    createBasketItemPatch,
    updateBasketItemPatch,
    deleteBasketItemPatch,
    createBasketItem,
    deleteBasketItem,
    updateShopItemsList,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShopContext = () => {
  return useContext(ShopContext);
};

export { ShopProvider, useShopContext };
