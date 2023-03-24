import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

import Title from './components/home/Title';
import Pages from './components/home/Pages';
import Page from './components/pages/Page';
import CategoryType from './components/categories/CategoryType';
import PatchType from './components/categories/shop/PatchType';
import PatchCategory from './components/categories/shop/PatchCategory';
import CustomPatch from './components/categories/shop/CustomPatch';
import Basket from './components/categories/shop/Basket';

import { useShopContext } from './context/shop';

function App() {
  const [count, setCount] = useState(0);

  const [shopItemsList, setShopItemsList] = useState(
    JSON.parse(window.localStorage.getItem('shop-items-list'))
  );
  const [basketList, setBasketList] = useState(
    JSON.parse(window.localStorage.getItem('basket-list'))
  );
  const Location = useLocation();
  const [patchQuantity, setPatchQuantity] = useState(0);

  const { getBasket } = useShopContext();

  useEffect(() => {
    setCount(Number(localStorage.getItem('count')));
  });

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    localStorage.setItem('count', 1);
  };

  useEffect(() => {
    const storedShopItemsList = JSON.parse(
      window.localStorage.getItem('shop-items-list')
    );
    const storedBasketList = JSON.parse(
      window.localStorage.getItem('basket-list')
    );

    const foundItem = (arr, shopItem) => {
      return arr.find((arr) => shopItem.description === arr.description);
    };

    if (storedBasketList) {
      const updatedShopItemsList = storedShopItemsList.map((shopItem) => {
        if (foundItem(storedBasketList, shopItem))
          return { ...shopItem, basketStatus: 'Remove from basket' };
        return shopItem;
      });
      setShopItemsList(updatedShopItemsList);
    }
  }, [count]);

  useEffect(() => {
    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      getBasket(basketId, setBasketList);
    }
  });

  return (
    <>
      <div className="App">
        <Basket
          basketList={basketList}
          setBasketList={setBasketList}
          shopItemsList={shopItemsList}
          setShopItemsList={setShopItemsList}
          patchQuantity={patchQuantity}
          setPatchQuantity={setPatchQuantity}
        />
        <Pages />
      </div>
      <Routes>
        <Route path="/" element={<Title />} />
        <Route path="/:page" element={<Page />} />
        <Route
          path="/:page/:category"
          element={
            <CategoryType
              shopItemsList={shopItemsList}
              setShopItemsList={setShopItemsList}
              basketList={basketList}
              setBasketList={setBasketList}
            />
          }
        />
        <Route path="/shop/patches" element={<PatchType />}></Route>
        <Route path="/shop/patches/:type" element={<PatchType />}></Route>
        <Route
          path="/shop/patches/:type/:category"
          element={<PatchCategory />}
        ></Route>
        <Route
          path="/shop/patches/embroided/custom/:design"
          element={
            <CustomPatch
              patchQuantity={patchQuantity}
              setPatchQuantity={setPatchQuantity}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
