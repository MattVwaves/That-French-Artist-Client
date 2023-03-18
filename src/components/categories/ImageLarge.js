export default function ImageLarge({ imageLargeUrl }) {
  return (
    <>
      <div className="container-center">
        {/* <span onClick={handleCloseImageLarge}>X</span> */}
        <img src={imageLargeUrl} alt="large" id="image-large" />
      </div>
    </>
  );
}
