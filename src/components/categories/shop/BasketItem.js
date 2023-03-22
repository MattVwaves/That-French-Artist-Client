export default function BasketItem({ basketItem }) {
  const handleBasketStatus = (basketItem) => {};

  return (
    <li>
      <img
        src={require(`../../../assets/shop/clothes/${basketItem.description}.png`)}
        alt="reddress"
        width="50px"
      />
      <span> {basketItem.price}</span>
      <button onClick={() => handleBasketStatus(basketItem)}>
        Remove from basket
      </button>
    </li>
  );
}
