import { useState, useEffect } from 'react';
import DisplayItemListType from './DisplayItemListType';
import Back from '../functional/back';

export default function DisplayItemList({ category }) {
  const [displayItemList, setDisplayItemList] = useState(null);
  const apiUrl = 'http://localhost:4000';

  useEffect(() => {
    fetch(`${apiUrl}/item/display/?subcategory=${category}`)
      .then((res) => res.json())
      .then((data) => setDisplayItemList(data.itemsList));
  });

  return (
    <>
      <Back />
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
