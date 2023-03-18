import { useState } from 'react';

import ImageItem from './ImageItem';
import VideoItem from './VideoItem';
import ImageLarge from './ImageLarge';

export default function DisplayItemListType({ category, displayItemList }) {
  const [imageLarge, setImageLarge] = useState(false);
  const [imageLargeUrl, setImageLargeUrl] = useState(null);
  const handlePhotoLarge = (e) => {
    const imageUrl = e.target.src;
    console.log(imageLargeUrl);
    setImageLarge(!imageLarge);
    setImageLargeUrl(imageUrl);
    // setBlurBgImages({ filter: 'blur(4px)' });
  };
  return (
    <>
      {imageLarge && (
        <ImageLarge
          imageLargeUrl={imageLargeUrl}
          handlePhotoLarge={handlePhotoLarge}
        />
      )}
      {displayItemList.map((displayItem) => (
        <li key={displayItem.id} className="category">
          {category !== 'videos' ? (
            <ImageItem
              displayItem={displayItem}
              handlePhotoLarge={handlePhotoLarge}
            />
          ) : (
            <VideoItem displayItem={displayItem} />
          )}
        </li>
      ))}
    </>
  );
}
