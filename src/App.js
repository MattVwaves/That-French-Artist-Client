import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import { useState, useEffect } from 'react';

import HomePage from './components/home/HomePage';
import Page from './components/pages/Page';
import CategoryType from './components/categories/CategoryType';
import PatchType from './components/categories/shop/PatchType';
import PatchCategory from './components/categories/shop/PatchCategory';
import CustomPatch from './components/categories/shop/CustomPatch';
import Basket from './components/categories/shop/Basket';

function App() {
  const [showTitle, setShowTitle] = useState(true);
  const [basketList, setBasketList] = useState([]);
  const Location = useLocation();

  useEffect(() => {
    if (Location.pathname !== '/') setShowTitle(false);

    const basketId = localStorage.getItem('basketId');
    if (basketId) {
      fetch(`http://localhost:4000/basket/${basketId}`)
        .then((res) => res.json())
        .then((data) => setBasketList(data.basket.basketItems));
    }
  }, [Location]);

  return (
    <>
      <div className="App">
        <Basket basketList={basketList} />
        <HomePage showTitle={showTitle} setShowTitle={setShowTitle} />
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/:page" element={<Page />} />
        <Route
          path="/:page/:category"
          element={
            <CategoryType
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
          element={<CustomPatch />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
