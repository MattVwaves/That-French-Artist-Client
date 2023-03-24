import { createContext, useContext } from 'react';

const ShopContext = createContext();
const apiUrl = 'http://localhost:4000';

const ShopProvider = ({ children }) => {
  const getBasket = async (basketId, setBasketList) => {
    await fetch(`http://localhost:4000/basket/${basketId}`)
      .then((res) => res.json())
      .then((data) => setBasketList(data.basket.basketItems));
  };

  const createFirstBasketItem = async (
    shopItem,
    shopItemsList,
    setShopItemsList,
    setBasketList,
    setBasketId
  ) => {
    const opts = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        description: shopItem.description,
        category: shopItem.category,
        price: shopItem.price,
      }),
    };
    await fetch(`${apiUrl}/basket`, opts)
      .then((res) => res.json())
      .then((data) => {
        const basketList = data.basket.basketItems;
        setBasketList(basketList);
        localStorage.setItem('basketId', data.basket.id);
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

  const value = {
    getBasket,
    createFirstBasketItem,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShopContext = () => {
  return useContext(ShopContext);
};

export { ShopProvider, useShopContext };
