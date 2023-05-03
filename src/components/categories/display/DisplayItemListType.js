import { useState } from 'react';

import ImageItem from './ImageItem';
import VideoItem from './VideoItem';
import ImageLarge from './ImageLarge';
import Recordings from './Recordings';

export default function DisplayItemListType({ category, displayItemList }) {
  const [imageLarge, setImageLarge] = useState(false);
  const [imageLargeUrl, setImageLargeUrl] = useState(null);
  const [blurBgImages, setBlurBgImages] = useState({ filter: 'blur(0px)' });

  const handlePhotoLarge = (e) => {
    const imageUrl = e.target.src;
    setImageLarge(!imageLarge);
    setImageLargeUrl(imageUrl);
    setBlurBgImages({ filter: 'blur(10px)' });
  };
  return (
    <>
      {displayItemList.map((displayItem) => (
        <li key={displayItem.id} className="category">
          {category !== 'videos' ? (
            <ImageItem
              displayItem={displayItem}
              handlePhotoLarge={handlePhotoLarge}
              blurBgImages={blurBgImages}
            />
          ) : (
            <VideoItem displayItem={displayItem} />
          )}
        </li>
      ))}
      {category === 'recordings' && <Recordings />}
      {imageLarge && (
        <ImageLarge
          imageLargeUrl={imageLargeUrl}
          handlePhotoLarge={handlePhotoLarge}
          setImageLarge={setImageLarge}
          setBlurBgImages={setBlurBgImages}
        />
      )}
    </>
  );
}
