import { useParams } from 'react-router';
import { useEffect } from 'react';

import DisplayItemList from './display/DisplayItemList';
import SetShopItemCategory from './shop/SetShopItemCategory';

export default function CategoryType({ setShowTitle }) {
  const { category, page } = useParams();

  useEffect(() => {
    console.log(category);
    setShowTitle(false);
  });

  return (
    <>
      {(page === 'images' || page === 'music') && (
        <DisplayItemList category={category} />
      )}
      {page === 'shop' && <SetShopItemCategory category={category} />}
    </>
  );
}
