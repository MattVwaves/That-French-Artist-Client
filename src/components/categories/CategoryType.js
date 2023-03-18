import { useParams } from 'react-router';
import { useEffect } from 'react';

import DisplayItemList from './DisplayItemList';

export default function CategoryType({ setShowTitle }) {
  const { category, page } = useParams();

  useEffect(() => {
    setShowTitle(false);
  });

  return <>{page !== 'shop' && <DisplayItemList category={category} />}</>;
}
