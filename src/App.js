import './App.css';
import { Route, Routes } from 'react-router';
import { useState } from 'react';

import HomePage from './components/home/HomePage';
import Page from './components/pages/Page';

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
          element={<Page page={'images'} setShowTitle={setShowTitle} />}
        />
        <Route
          path="/shop"
          element={<Page page={'shop'} setShowTitle={setShowTitle} />}
        />
        <Route
          path="/music"
          element={<Page page={'music'} setShowTitle={setShowTitle} />}
        />
        <Route
          path="/about"
          element={<Page page={'about'} setShowTitle={setShowTitle} />}
        />
      </Routes>
    </>
  );
}

export default App;
