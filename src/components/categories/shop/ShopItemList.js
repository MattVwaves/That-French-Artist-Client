import { useEffect } from 'react';

export default function ShopItemList({ shopItemsList }) {
  useEffect(() => {
    console.log(shopItemsList);
  });
  return (
    <>
      {shopItemsList.map((shopItem) => {
        return (
          <li className="category">
            <img
              src={require(`../../../assets/shop/clothes/${shopItem.description}.png`)}
              height="150px"
              alt="shopItem"
            />
            <div className="adding-removing-items">
              <span> £20.00</span>
              <button style={{ backgroundColor: 'white' }}>
                add to basket
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
}
