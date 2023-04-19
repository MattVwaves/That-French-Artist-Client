import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useShopContext } from '../../../context/shop';

import BackIcon from '../../functional/back';

export default function CustomPatch({
  patchQuantity,
  setPatchQuantity,
  basketList,
  setBasketList,
}) {
  const { design } = useParams();
  const [frameColour, setFrameColour] = useState('white');
  const [designColour, setDesignColour] = useState('white');
  const [patchId, setPatchId] = useState(null);
  const [basketId, setBasketId] = useState(
    window.localStorage.getItem('basketId')
  );

  const {
    createFirstBasketItemPatch,
    createBasketItemPatch,
    updateBasketItemPatch,
    deleteBasketItemPatch,
  } = useShopContext();

  useEffect(() => {
    setPatchQuantity(0);
  }, [design]);

  const setLocalBasket = async (updatedBasketList) => {
    window.localStorage.setItem(
      'basket-list',
      JSON.stringify(updatedBasketList)
    );
  };

  useEffect(() => {
    const storedFrameColour = localStorage.getItem('frame-colour');
    const storedDesignColour = localStorage.getItem('design-colour');
    const storedPatchId = localStorage.getItem('custom-patch-id');

    if (storedFrameColour) setFrameColour(storedFrameColour);
    if (storedDesignColour) setDesignColour(storedDesignColour);
    if (storedPatchId) setPatchId(storedPatchId);
  });

  const handleColour = (e) => {
    localStorage.setItem('custom-patch-id', null);
    setPatchQuantity(0);
    const component = e.target.id;
    const colour = e.target.value;
    if (component === 'frame-colour') {
      setFrameColour(colour);
      localStorage.setItem('frame-colour', colour);
    }
    if (component === 'design-colour') {
      setDesignColour(colour);
      localStorage.setItem('design-colour', colour);
    }
  };

  const handleAddPatch = async () => {
    const description = `cstm-${design}-${designColour}-${frameColour}`;
    const category = 'patches';
    const price = '£15.00';

    if (!basketId) {
      await createFirstBasketItemPatch(
        description,
        category,
        price,
        setBasketList,
        setBasketId,
        setPatchId
      );
      setPatchQuantity(1);
      setPatchId(patchId);

      window.localStorage.setItem('custom-patch-quantity', 1);
      return;
    }

    if (patchQuantity === 0) {
      await createBasketItemPatch(
        description,
        category,
        price,
        basketId,
        setBasketList,
        basketList,
        setPatchId
      );
      setPatchQuantity(1);
      window.localStorage.setItem('custom-patch-quantity', 1);
      return;
    }

    const quantity = patchQuantity + 1;
    await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
    const newPatchQuantity = patchQuantity + 1;
    setPatchQuantity(newPatchQuantity);
    window.localStorage.setItem('custom-patch-quantity', newPatchQuantity);
  };

  const handleRemovePatch = async () => {
    if (patchQuantity > 1) {
      const quantity = patchQuantity - 1;
      await updateBasketItemPatch(quantity, patchId, basketList, setBasketList);
      const newPatchQuantity = patchQuantity - 1;
      setPatchQuantity(newPatchQuantity);
      window.localStorage.setItem('custom-patch-quantity', newPatchQuantity);
    }

    if (patchQuantity === 1) {
      await deleteBasketItemPatch(patchId, basketList, setBasketList);
      setPatchQuantity(0);
      window.localStorage.setItem('custom-patch-quantity', 0);
      window.localStorage.setItem('cistom-patch-id', null);
    }
  };

  return (
    <>
      <BackIcon />
      <div className="patch-custom">
        {design === 'dino' && (
          <div>
            <img
              src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/frame${frameColour}.png`)}
              alt="patch-frame"
              id="patch-frame"
              height="325px"
            />
            <img
              src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/${designColour}.png`)}
              alt="patch-frame"
              id="patch-design"
              height="325px"
            />
          </div>
        )}
        {design !== 'dino' && (
          <div>
            <img
              src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/frame${frameColour}.png`)}
              alt="patch-frame"
              id="patch-frame"
              height="275px"
            />
            <img
              src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/${designColour}.png`)}
              alt="patch-frame"
              id="patch-design"
              height="275px"
            />
          </div>
        )}
        <form className="patch-selects">
          <label for="patches">frame colour</label>
          <select
            id="frame-colour"
            onChange={handleColour}
            name="patch"
            form="patch-selects"
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="white">white</option>
            <option value="turquoise">turquoise</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="orange">orange</option>
            <option value="pink">pink</option>
            <option value="purple">purple</option>
            <option value="red">red</option>
          </select>
        </form>
        <form className="patch-selects">
          <label for="patches">design colour</label>
          <select
            id="design-colour"
            onChange={handleColour}
            name="patch"
            form="patch-selects"
          >
            <option value="" selected disabled hidden>
              Choose here
            </option>
            <option value="white">white</option>
            <option value="turquoise">turquoise</option>
            <option value="yellow">yellow</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="orange">orange</option>
            <option value="pink">pink</option>
            <option value="purple">purple</option>
            <option value="red">red</option>
          </select>
        </form>
        <span id="custom-patch-price">£15.00</span>
        <button onClick={handleAddPatch}>+</button>
        <button onClick={handleRemovePatch}>-</button>
        <span id="custom-patch-price">{patchQuantity}</span>
      </div>
    </>
  );
}
