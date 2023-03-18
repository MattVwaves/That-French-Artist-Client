export default function ImageItemList({
  displayItem,
  handlePhotoLarge,
  blurBgImages,
}) {
  return (
    <>
      <img
        id="display-image"
        src={require(`../../assets/${displayItem.subCategory}/${displayItem.description}.png`)}
        alt="display-item"
        height="200px"
        onClick={handlePhotoLarge}
        style={blurBgImages}
      />
    </>
  );
}
