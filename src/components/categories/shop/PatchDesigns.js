import { useState } from 'react';
import { useNavigate } from 'react-router';

import BackIcon from '../../functional/back';

export default function PatchDesigns() {
  const Navigate = useNavigate();

  const handleShowPatch = (e) => {
    const patchDesign = e.target.name;
    window.localStorage.setItem('custom-patch-quantity', 0);
    Navigate(`/shop/patches/embroided/custom/${patchDesign}`);
  };
  return (
    <>
      <BackIcon />
      <ul className="container-center" id="custom-designs">
        <li className="custom-design">
          <img
            src={require('../../../assets/shop/patches/embroided/custom-designs/cat.png')}
            onClick={handleShowPatch}
            name="cat-cut"
            height="130px"
            alt="patch-design"
          />
        </li>
        <li>
          <img
            src={require('../../../assets/shop/patches/embroided/custom-designs/dino.png')}
            onClick={handleShowPatch}
            name="dino"
            height="130px"
            alt="patch-design"
          />
        </li>
        <li>
          <img
            src={require('../../../assets/shop/patches/embroided/custom-designs/skel.png')}
            onClick={handleShowPatch}
            name="cat-skel"
            height="130px"
            alt="patch-design"
          />
        </li>
      </ul>
    </>
  );
}
