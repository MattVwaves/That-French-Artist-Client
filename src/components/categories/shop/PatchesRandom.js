import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BackIcon from '../../functional/back';
import Disclaimer from './Disclaimer';
import PatchesAddRemove from './PatchesAddRemove';

export default function PatchesRandom({
  basketList,
  setBasketList,
  randomPatchQuantity,
  setRandomPatchQuantity,
}) {
  const [patchList, setPatchList] = useState([]);
  const { category } = useParams();
  const [patchCategory, setPatchCategory] = useState(undefined);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const apiUrl = 'http://localhost:4000';
  const liveUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if (category === 'embroided-random') {
      setPatchCategory('embroided');
      localStorage.setItem('patch-category', 'embroided');
    }
    if (category === 'bleached-random') {
      setPatchCategory('bleached');
      localStorage.setItem('patch-category', 'bleached');
    }

    fetch(`${liveUrl}/item/shop/?category=${patchCategory}-patches`)
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
        <PatchesAddRemove
          randomPatchQuantity={randomPatchQuantity}
          setRandomPatchQuantity={setRandomPatchQuantity}
          basketList={basketList}
          setBasketList={setBasketList}
        />
      )}

      {patchList && (
        <div className="patches-all-container">
          {patchList.map((patch) => {
            return (
              <li className="grid-center" key={patch.id}>
                <img
                  src={require(`../../../assets/shop/patches/${patchCategory}/${patch.description}.png`)}
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
