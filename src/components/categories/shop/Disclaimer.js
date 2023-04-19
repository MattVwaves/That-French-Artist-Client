export default function Disclaimer({ handleCloseDisclaimer }) {
  const disclaimerText =
    'This is the page where you can order a RANDOM patch. It will be a complete SUPRISE to you. LIKE A MYSTERY BOX, but just a patch. You choose the size but leave the design and colours up to me!';

  return (
    <div className="disclaimer-container">
      <div className="container-center">
        <img
          id="patch-popup"
          src={require('../../../assets/functional/splooch6.png')}
          alt="splooch6"
        />
      </div>
      <div className="container-center">
        <img
          id="patch-popup-2"
          src={require('../../../assets/functional/splooch6upsidedown.png')}
          alt="splooch6upsidedown"
        />
      </div>
      <div className="container-center">
        <h2 id="disclaimer-heading">DISCLAIMER!</h2>
        <p id="disclaimer-text">{disclaimerText}</p>
        <span onClick={handleCloseDisclaimer} id="disclaimer-close">
          X
        </span>
      </div>
    </div>
  );
}
