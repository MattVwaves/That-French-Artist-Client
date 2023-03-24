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
    createFirstBasketItem,
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
