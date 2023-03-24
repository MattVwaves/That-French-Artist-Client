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
  const [shopItemsList, setShopItemsList] = useState([]);
  const [basketList, setBasketList] = useState([]);
  const Location = useLocation();
  const [patchQuantity, setPatchQuantity] = useState(0);

  const { getBasket } = useShopContext();

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
