import './App.css';
import { Route, Routes } from 'react-router';
import { useState } from 'react';

import HomePage from './components/home/HomePage';
import Categories from './components/pages/Categories';

function App() {
  const [showTitle, setShowTitle] = useState(true);
  return (
    <>
      <div className="App">
        <HomePage showTitle={showTitle} setShowTitle={setShowTitle} />
      </div>
      <Routes>
        <Route path="/" />
        <Route
          path="/images"
          element={
            <Categories category={'images'} setShowTitle={setShowTitle} />
          }
        />
        <Route
          path="/shop"
          element={<Categories category={'shop'} setShowTitle={setShowTitle} />}
        />
        <Route
          path="/music"
          element={
            <Categories category={'music'} setShowTitle={setShowTitle} />
          }
        />
        <Route
          path="/about"
          element={
            <Categories category={'about'} setShowTitle={setShowTitle} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
