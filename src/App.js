import './App.css';
import { Route, Routes } from 'react-router';
import { useState, useEffect } from 'react';

import Title from './components/home/Title';
import Pages from './components/home/Pages';
import Page from './components/pages/Page';
import CategoryType from './components/categories/CategoryType';
import PatchType from './components/categories/shop/PatchType';
import PatchCategory from './components/categories/shop/PatchCategory';
import CustomPatch from './components/categories/shop/CustomPatch';
import Basket from './components/categories/shop/Basket';

function App() {
  const [shopItemsList, setShopItemsList] = useState(
    JSON.parse(window.localStorage.getItem('shop-items-list'))
  );
  const [basketList, setBasketList] = useState(
    JSON.parse(window.localStorage.getItem('basket-list'))
  );
  const [patchQuantity, setPatchQuantity] = useState(
    JSON.parse(window.localStorage.getItem('custom-patch-quantity'))
  );

  useEffect(() => {
    if (
      JSON.parse(window.localStorage.getItem('custom-patch-quantity')) === null
    ) {
      setPatchQuantity(0);
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
              basketList={basketList}
              setBasketList={setBasketList}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
