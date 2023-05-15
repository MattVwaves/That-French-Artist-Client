import { useState, useEffect } from 'react';
import DisplayItemListType from './DisplayItemListType';
import Back from '../../functional/back';

export default function DisplayItemList({ category }) {
  const [displayItemList, setDisplayItemList] = useState(null);
  const apiUrl = 'http://localhost:4000';
  const liveUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    fetch(`${liveUrl}/item/display/?subcategory=${category}`)
      .then((res) => res.json())
      .then((data) => setDisplayItemList(data.itemsList));
  });

  return (
    <>
      <Back />
      <div className="center-horizontal"></div>
      {displayItemList && (
        <ul className="display-items">
          <DisplayItemListType
            category={category}
            displayItemList={displayItemList}
          />
        </ul>
      )}
    </>
  );
}
