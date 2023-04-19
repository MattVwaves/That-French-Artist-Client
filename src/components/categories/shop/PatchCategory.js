import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import PatchDesigns from './PatchDesigns';
import PatchesRandom from './PatchesRandom';

export default function PatchLists({
  basketList,
  setBasketList,
  randomPatchQuantity,
  setRandomPatchQuantity,
}) {
  const { category } = useParams();

  const [showPatchDesigns, setShowPatchDesigns] = useState(false);
  const [showRandomPatches, setShowRandomPatches] = useState(false);

  useEffect(() => {
    if (category === 'custom') setShowPatchDesigns(true);
    if (category === 'embroided-random' || category === 'bleached-random')
      setShowRandomPatches(true);
  });

  return (
    <>
      {showPatchDesigns && <PatchDesigns />}
      {showRandomPatches && (
        <PatchesRandom
          basketList={basketList}
          setBasketList={setBasketList}
          randomPatchQuantity={randomPatchQuantity}
          setRandomPatchQuantity={setRandomPatchQuantity}
        />
      )}
    </>
  );
}
