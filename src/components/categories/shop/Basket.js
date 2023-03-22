import BasketItem from './BasketItem';
import Total from './Total';

export default function Basket({ basketList }) {
  return (
    <div className="basket-container">
      <h1>BASKET</h1>
      <ul>
        {basketList &&
          basketList.map((basketItem) => {
            return (
              <BasketItem
                basketItem={basketItem}
                // handleBasketStatus={handleBasketStatus}
                // patchQuantity={patchQuantity}
                // setPatchQuantity={setPatchQuantity}
                // patchId={patchId}
                // setPatchId={setPatchId}
              />
            );
          })}
      </ul>
      <Total basketList={basketList} />
    </div>
  );
}
