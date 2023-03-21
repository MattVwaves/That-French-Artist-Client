import './App.css';
import { Route, Routes } from 'react-router';
import { useState } from 'react';

import HomePage from './components/home/HomePage';
import Page from './components/pages/Page';
import CategoryType from './components/categories/CategoryType';
import PatchType from './components/categories/shop/PatchType';
import PatchCategory from './components/categories/shop/PatchCategory';

function App() {
  const [showTitle, setShowTitle] = useState(true);

  return (
    <>
      <div className="App">
        <HomePage showTitle={showTitle} setShowTitle={setShowTitle} />
      </div>
      <Routes>
        <Route path="/" />
        <Route path="/:page" element={<Page setShowTitle={setShowTitle} />} />
        <Route
          path="/:page/:category"
          element={<CategoryType setShowTitle={setShowTitle} />}
        />
        <Route path="/shop/patches" element={<PatchType />}></Route>
        <Route path="/shop/patches/:type" element={<PatchType />}></Route>
        <Route
          path="/shop/patches/:type/:category"
          element={<PatchCategory />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
