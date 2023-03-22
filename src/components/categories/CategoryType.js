import { useParams } from 'react-router';
import { useEffect } from 'react';

import DisplayItemList from './display/DisplayItemList';
import SetShopItemCategory from './shop/SetShopItemCategory';

export default function CategoryType({
  shopItemsList,
  setShopItemsList,
  basketList,
  setBasketList,
}) {
  const { category, page } = useParams();

  useEffect(() => {});

  return (
    <>
      {(page === 'images' || page === 'music') && (
        <DisplayItemList category={category} />
      )}
      {page === 'shop' && (
        <SetShopItemCategory
          category={category}
          shopItemsList={shopItemsList}
          setShopItemsList={setShopItemsList}
          basketList={basketList}
          setBasketList={setBasketList}
        />
      )}
    </>
  );
}
