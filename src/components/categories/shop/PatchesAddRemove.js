import { useState, useEffect } from 'react';
import { useShopContext } from '../../../context/shop';

export default function PatchesAddRemove({
  basketList,
  setBasketList,
  randomPatchQuantity,
  setRandomPatchQuantity,
}) {
  const [basketId, setBasketId] = useState(
    window.localStorage.getItem('basketId')
  );
  const patchCategory = localStorage.getItem('patch-category');
  const smallPatchId = Number(localStorage.getItem('random-patch-small-id'));
  const largePatchId = Number(localStorage.getItem('random-patch-large-id'));
  const smallPatchQuantity = Number(
    localStorage.getItem('random-patch-small-quantity')
  );
  const largePatchQuantity = Number(
    localStorage.getItem('random-patch-large-quantity')
  );

  const {
    createFirstBasketItemPatch,
    createBasketItemPatch,
    updateBasketItemPatch,
    deleteBasketItemPatch,
  } = useShopContext();

  useEffect(() => {
    setRandomPatchQuantity(0);
  });

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
      setRandomPatchQuantity(1);
      if (size === 'small')
        localStorage.setItem('random-patch-small-quantity', 1);
      if (size === 'large')
        localStorage.setItem('random-patch-large-quantity', 1);
      return;
    }
    let quantity;
    let patchId;
    if (size === 'small' && smallPatchId) {
      quantity =
        Number(localStorage.getItem('random-patch-small-quantity')) + 1;
      localStorage.setItem('random-patch-small-quantity', quantity);
      patchId = smallPatchId;
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }
    if (size === 'large' && largePatchId) {
      quantity =
        Number(localStorage.getItem('random-patch-large-quantity')) + 1;
      localStorage.setItem('random-patch-large-quantity', quantity);
      patchId = largePatchId;
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }
    if (size === 'small' && !smallPatchId) {
      console.log(basketList);
      await createBasketItemPatch(
        description,
        category,
        price,
        basketId,
        basketList,
        setBasketList
      );
      localStorage.setItem('random-patch-small-quantity', 1);
    }
    if (size === 'large' && !largePatchId) {
      await createBasketItemPatch(
        description,
        category,
        price,
        basketId,
        setBasketList,
        basketList
      );
      localStorage.setItem('random-patch-large-quantity', 1);
    }
  };

  const handleRemovePatch = async (e) => {
    let quantity;
    let patchId;
    const size = e.target.name;
    if (size === 'small' && smallPatchQuantity > 1) {
      quantity = smallPatchQuantity - 1;
      patchId = smallPatchId;
      localStorage.setItem('random-patch-small-quantity', quantity);
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }
    if (size === 'large' && largePatchQuantity > 1) {
      quantity = largePatchQuantity - 1;
      patchId = largePatchId;
      localStorage.setItem('random-patch-large-quantity', quantity);
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      return;
    }
    if (size === 'small' && smallPatchQuantity === 1) {
      patchId = smallPatchId;
      localStorage.setItem('random-patch-small-quantity', 0);
      localStorage.setItem('random-patch-small-id', null);
      await deleteBasketItemPatch(patchId, basketList, setBasketList);
    }
    if (size === 'large' && largePatchQuantity === 1) {
      patchId = largePatchId;
      localStorage.setItem('random-patch-large-quantity', 0);
      localStorage.setItem('random-patch-large-id', null);
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
        <span>
          {Number(localStorage.getItem('random-patch-small-quantity'))}
        </span>
      </div>
      <div className="patch-selects ">
        <button name="large" onClick={handleAddPatch}>
          +
        </button>
        <button name="large" onClick={handleRemovePatch}>
          -
        </button>
        <span>
          {Number(localStorage.getItem('random-patch-large-quantity'))}
        </span>
      </div>
    </div>
  );
}
