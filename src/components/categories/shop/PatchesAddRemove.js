import { useState, useEffect } from 'react';
import { useShopContext } from '../../../context/shop';

export default function PatchesAddRemove({ basketList, setBasketList }) {
  const [basketId, setBasketId] = useState(
    window.localStorage.getItem('basketId')
  );
  const patchCategory = localStorage.getItem('patch-category');
  const smallPatchId = Number(
    localStorage.getItem(`rndm-small-${patchCategory}-id`)
  );
  const largePatchId = Number(
    localStorage.getItem(`rndm-large-${patchCategory}-id`)
  );
  const smallPatchQ = Number(
    localStorage.getItem(`rndm-small-${patchCategory}-q`)
  );
  const largePatchQ = Number(
    localStorage.getItem(`rndm-large-${patchCategory}-q`)
  );

  const {
    createFirstBasketItemPatch,
    createBasketItemPatch,
    updateBasketItemPatch,
    deleteBasketItemPatch,
  } = useShopContext();

  const handleAddPatch = async (e) => {
    const size = e.target.name;
    const description = `rndm-${size}-${patchCategory}`;
    const category = 'patches';
    let price = '';
    if (size === 'small') price = '£13.00';
    if (size === 'large') price = '£18.00';

    if (!basketId) {
      await createFirstBasketItemPatch(
        description,
        category,
        price,
        setBasketList,
        setBasketId
      );
      localStorage.setItem(`${description}-q`, 1);
      return;
    }
    let quantity;
    let patchId;

    const storedId = Number(localStorage.getItem(`${description}-id`));
    const storedQ = Number(localStorage.getItem(`${description}-q`));

    if (storedId) {
      quantity = storedQ + 1;
      patchId = storedId;
      localStorage.setItem(`${description}-q`, quantity);
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }
    if (!storedId) {
      await createBasketItemPatch(
        description,
        category,
        price,
        basketId,
        setBasketList,
        basketList
      );
      localStorage.setItem(`${description}-q`, 1);
    }
  };

  const handleRemovePatch = async (e) => {
    let quantity;
    let patchId;
    const size = e.target.name;
    const description = `rndm-${size}-${patchCategory}`;

    const storedId = Number(localStorage.getItem(`${description}-id`));
    const storedQ = Number(localStorage.getItem(`${description}-q`));

    if (storedId && storedQ > 1) {
      quantity = storedQ - 1;
      patchId = storedId;
      localStorage.setItem(`${description}-q`, quantity);
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }

    if (storedId && storedQ === 1) {
      patchId = storedId;
      localStorage.setItem(`${description}-q`, 0);
      localStorage.setItem(`${description}-id`, null);
      await deleteBasketItemPatch(patchId, basketList, setBasketList);
    }
  };
  return (
    <div className="patch-custom" id="random-add">
      <span id="size">small</span>
      <span id="size">large</span>
      <span>£13</span>
      <span>£18</span>
      <div className="patch-selects">
        <button name="small" onClick={handleAddPatch}>
          +
        </button>
        <button name="small" onClick={handleRemovePatch}>
          -
        </button>
        {smallPatchQ ? <span>{smallPatchQ}</span> : <span>0</span>}
      </div>
      <div className="patch-selects ">
        <button name="large" onClick={handleAddPatch}>
          +
        </button>
        <button name="large" onClick={handleRemovePatch}>
          -
        </button>
        {largePatchQ ? <span>{largePatchQ}</span> : <span>0</span>}
      </div>
    </div>
  );
}
