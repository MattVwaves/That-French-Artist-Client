import ImageItem from './ImageItem';
import VideoItem from './VideoItem';

export default function DisplayItemListType({ category, displayItemList }) {
  return (
    <>
      {displayItemList.map((displayItem) => (
        <li key={displayItem.id} className="category">
          {category !== 'videos' ? (
            <ImageItem displayItem={displayItem} />
          ) : (
            <VideoItem displayItem={displayItem} />
          )}
        </li>
      ))}
    </>
  );
}
