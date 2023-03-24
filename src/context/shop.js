import { createContext, useContext } from 'react';

const ShopContext = createContext();
const apiUrl = 'http://localhost:4000';

const ShopProvider = ({ children }) => {
  const getBasket = async (basketId, setBasketList) => {
    await fetch(`http://localhost:4000/basket/${basketId}`)
      .then((res) => res.json())
      .then((data) => setBasketList(data.basket.basketItems));
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
        const basketList = data.basket.basketItems;
        setBasketList(basketList);
        window.localStorage.setItem('basketId', data.basket.id);
        setBasketId(data.basket.id);
        window.localStorage.setItem('basket-list', JSON.stringify(basketList));
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
        window.localStorage.setItem(
          'basket-list',
          JSON.stringify(updatedBasketList)
        );
      });
  };

  const value = {
    getBasket,
    createFirstBasketItem,
    createBasketItem,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShopContext = () => {
  return useContext(ShopContext);
};

export { ShopProvider, useShopContext };
