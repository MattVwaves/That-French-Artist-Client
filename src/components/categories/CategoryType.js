import { useParams } from 'react-router';

import DisplayItemList from './DisplayItemList';

export default function CategoryType() {
  const { category, page } = useParams();
  return <>{page !== 'shop' && <DisplayItemList category={category} />}</>;
}
