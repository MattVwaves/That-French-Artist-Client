import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import CategoryTitle from './CategoryTitle';

export default function Categories({ setShowTitle }) {
  const [categoriesList, setCategoriesList] = useState([]);
  const imageCategories = ['photography', 'artworks', 'videos'];
  const musicCategories = ['instruments', 'videos', 'recordings', 'artworks'];
  const shopCategories = ['clothes', 'other', 'jewellery', 'patches'];

  const { page } = useParams();

  useEffect(() => {
    setShowTitle(false);
    if (page === 'images') setCategoriesList(imageCategories);
    if (page === 'music') setCategoriesList(musicCategories);
    if (page === 'shop') setCategoriesList(shopCategories);
  }, [page]);

  return (
    <>
      <ul className="container-center" id="category-list">
        {categoriesList.map((i) => {
          return <CategoryTitle key={i} category={i} page={page} />;
        })}
      </ul>
    </>
  );
}