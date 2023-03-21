import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BackIcon from '../../functional/back';

export default function PatchType() {
  const Location = useLocation();
  const [titleOne, setTitleOne] = useState('');
  const [titleTwo, setTitleTwo] = useState('');
  const [pathOne, setPathOne] = useState('');
  const [pathTwo, setPathTwo] = useState('');

  useEffect(() => {
    if (Location.pathname === '/shop/patches') {
      setTitleOne('embroided');
      setTitleTwo('bleached');
      setPathOne(`/shop/patches/${titleOne}`);
      setPathTwo(`/shop/patches/${titleTwo}`);
    }
    if (Location.pathname === '/shop/patches/embroided') {
      setTitleOne('custom');
      setTitleTwo('random');
      setPathOne(`/shop/patches/embroided/custom`);
      setPathTwo(`/shop/patches/embroided/embroided-random`);
    }
    if (Location.pathname === '/shop/patches/bleached') {
      setTitleOne('made to order');
      setTitleTwo('random');
      setPathOne(`/shop/patches/bleached/made-to-order`);
      setPathTwo(`/shop/patches/bleached/bleached-random`);
    }
  });
  return (
    <>
      <BackIcon />
      <ul className="container-center" id="patch-type">
        <li className="category">
          <Link
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              backgroundColor: 'inherit',
            }}
            to={pathOne}
          >
            <h3>{titleOne}</h3>
            <img
              src={require('../../../assets/shop/patches/embroided/dino-blue-orange.png')}
              alt="dino"
              height="100px"
            />
          </Link>
        </li>
        <li className="category">
          <Link
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              backgroundColor: 'inherit',
            }}
            to={pathTwo}
          >
            <h3>{titleTwo}</h3>
            <img
              src={require('../../../assets/shop/patches/embroided/dino-blue-orange.png')}
              alt="dino"
              height="100px"
            />
          </Link>
        </li>
      </ul>
    </>
  );
}
