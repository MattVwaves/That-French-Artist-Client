import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import CategoryTitle from './CategoryTitle';
import BackIcon from '../functional/back';

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);
  const imageCategories = ['photography', 'artworks', 'videos'];
  const musicCategories = ['instruments', 'videos', 'recordings', 'artworks'];
  const shopCategories = ['clothes', 'other', 'necklaces', 'patches'];

  const { page } = useParams();

  useEffect(() => {
    if (page === 'images') setCategoriesList(imageCategories);
    if (page === 'music') setCategoriesList(musicCategories);
    if (page === 'shop') setCategoriesList(shopCategories);
    if (page === 'about') setCategoriesList(null);
  }, [page]);

  return (
    <>
      <BackIcon />
      {page !== 'about' ? (
        <ul className="container-center" id="category-list">
          {categoriesList &&
            categoriesList.map((i) => {
              return <CategoryTitle key={i} category={i} page={page} />;
            })}
        </ul>
      ) : (
        <div className="container-center">Under Construction</div>
      )}
    </>
  );
}
