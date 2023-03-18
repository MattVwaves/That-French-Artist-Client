import './App.css';
import { Route, Routes } from 'react-router';
import { useState } from 'react';

import HomePage from './components/home/HomePage';
import Page from './components/pages/Page';
import DisplayCategory from './components/categories/DisplayCategory';

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
        <Route path="/:page/:type" element={<DisplayCategory />} />
      </Routes>
    </>
  );
}

export default App;
