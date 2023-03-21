import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BackIcon from '../../functional/back';
import Disclaimer from './Disclaimer';

export default function PatchesRandom() {
  const [patchList, setPatchList] = useState([]);
  const { category } = useParams();
  const [patchCategory, setPatchCategory] = useState(undefined);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const apiUrl = 'http://localhost:4000';

  useEffect(() => {
    if (category === 'embroided-random') setPatchCategory('embroided');
    if (category === 'bleached-random') setPatchCategory('bleached');

    fetch(`${apiUrl}/item/shop/?category=${patchCategory}-patches`)
      .then((res) => res.json())
      .then((data) => {
        const patchList = data.itemsList;
        setPatchList(patchList);
      });
  });

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  return (
    <>
      <BackIcon />
      {showDisclaimer && (
        <Disclaimer handleCloseDisclaimer={handleCloseDisclaimer} />
      )}
      {!showDisclaimer && (
        <div className="patch-custom" id="random-add">
          <span id="size">small</span>
          <span id="size">large</span>
          <span>£13</span>
          <span>£18</span>
          <div className="patch-selects">
            <button>+</button>
            <button>-</button>
            <span>0</span>
          </div>
          <div className="patch-selects ">
            <button>+</button>
            <button>-</button>
            <span>0</span>
          </div>
          {/* <AddMany id="small" /> */}
          {/* <AddMany id="large" /> */}
        </div>
      )}

      {patchList && (
        <div className="patches-all-container">
          {patchList.map((patch) => {
            return (
              <li className="grid-center">
                <img
                  src={require(`../../../assets/shop/patches/${patchCategory}/${patch.description}.png`)}
                  height="75px"
                  alt="patch"
                />
              </li>
            );
          })}
        </div>
      )}
    </>
  );
}
