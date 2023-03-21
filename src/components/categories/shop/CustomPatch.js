import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import BackIcon from '../../functional/back';

export default function CustomPatch() {
  const { design } = useParams();
  const [frameColour, setFrameColour] = useState('white');
  const [designColour, setDesignColour] = useState('white');
  const [patchQuantity, setPatchQuantity] = useState(0);

  useEffect(() => {
    setFrameColour('white');
    setDesignColour('white');
  });

  const handleColour = () => {};

  const handleAddPatch = () => {};

  const handleRemovePatch = () => {};

  return (
    <>
      <BackIcon />
      <div className="patch-custom">
        <div>
          <img
            src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/frame${frameColour}.png`)}
            alt="patch-frame"
            id="patch-frame"
          />
          <img
            src={require(`../../../assets/shop/patches/embroided/custom-components/${design}/${designColour}.png`)}
            alt="patch-frame"
            id="patch-design"
          />
        </div>
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
        <div className="patch-selects add-many-cart">
          <button onClick={handleAddPatch}>+</button>
          <button onClick={handleRemovePatch}>-</button>
          <span>{patchQuantity}</span>
        </div>
      </div>
    </>
  );
}
