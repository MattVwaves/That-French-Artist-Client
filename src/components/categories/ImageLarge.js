export default function ImageLarge({
  imageLargeUrl,
  setImageLarge,
  setBlurBgImages,
}) {
  const handleCloseImageLarge = () => {
    setImageLarge(false);
    setBlurBgImages({ filter: 'blur(0px)' });
  };
  return (
    <>
      <div className="container-center">
        <span id="close-popup" onClick={handleCloseImageLarge}>
          X
        </span>
        <img src={imageLargeUrl} alt="large" id="image-large" />
      </div>
    </>
  );
}
