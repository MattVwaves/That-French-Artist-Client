import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

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
  const basketId = localStorage.getItem('basketId');

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

  const handleAddPatch = () => {
    if (patchQuantity === 0) {
      const opts = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          description: `cstm-${design}-${designColour}-${frameColour}`,
          category: 'patches',
          price: '£15.00',
        }),
      };
      fetch(`http://localhost:4000/item/basket/${basketId}`, opts).then((res) =>
        res.json().then((data) => {
          window.localStorage.setItem('custom-patch-id', data.basketItem.id);
          const updatedBasketList = [...basketList, data.basketItem];
          console.log(data.basketItem);
          setBasketList(updatedBasketList);
          setLocalBasket(updatedBasketList);
          setPatchId(data.basketItem.id);
        })
      );
      setPatchQuantity(1);

      window.localStorage.setItem('custom-patch-quantity', 1);
      return;
    }
    const opts = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quantity: patchQuantity + 1,
      }),
    };

    fetch(`http://localhost:4000/item/basket/${patchId}`, opts)
      .then((res) => res.json())
      .then((data) => {
        const updatedPatch = data.updatedBasketItem;
        const updatedBasketList = basketList.map((basketItem) => {
          if (basketItem.id === updatedPatch.id) return updatedPatch;
          return basketItem;
        });
        setBasketList(updatedBasketList);
        setLocalBasket(updatedBasketList);
        const newPatchQuantity = patchQuantity + 1;
        setPatchQuantity(newPatchQuantity);
        window.localStorage.setItem('custom-patch-quantity', newPatchQuantity);
      });
  };

  const handleRemovePatch = () => {
    if (patchQuantity > 1) {
      const opts = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          quantity: patchQuantity - 1,
        }),
      };
      fetch(`http://localhost:4000/item/basket/${patchId}`, opts)
        .then((res) => res.json())
        .then((data) => {
          const updatedPatch = data.updatedBasketItem;
          const updatedBasketList = basketList.map((basketItem) => {
            if (basketItem.id === updatedPatch.id) return updatedPatch;
            return basketItem;
          });
          setBasketList(updatedBasketList);
          setLocalBasket(updatedBasketList);
          const newPatchQuantity = patchQuantity - 1;
          setPatchQuantity(newPatchQuantity);
          window.localStorage.setItem(
            'custom-patch-quantity',
            newPatchQuantity
          );
        });
    }
    if (patchQuantity === 1) {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`http://localhost:4000/item/basket/${patchId}`, opts)
        .then((res) => res.json())
        .then((data) => {
          const deletedPatch = data.basketItem;
          const updatedBasketList = basketList.filter((basketItem) => {
            return basketItem.id !== deletedPatch.id;
          });
          setBasketList(updatedBasketList);
          setLocalBasket(updatedBasketList);
          setPatchQuantity(0);
          window.localStorage.setItem('custom-patch-quantity', 0);
          window.localStorage.setItem('cistom-patch-id', null);
        });
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
