export default function BasketItem({
  shopItemsList,
  setShopItemsList,
  basketItem,
  basketList,
}) {
  const handleBasketStatus = (basketItem) => {
    const foundItem = basketList.find(
      (storedItem) => basketItem.description === storedItem.description
    );
    if (foundItem) {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts);
    }
    const updatedItemsList = shopItemsList.map((storedItem) => {
      if (storedItem.description === basketItem.description) {
        return { ...storedItem, basketStatus: 'Add to basket' };
      }
      return storedItem;
    });
    setShopItemsList(updatedItemsList);
  };

  const handleAddPatch = () => {
    const opts = {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        quantity: basketItem.quantity + 1,
      }),
    };

    fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts);
  };

  const handleRemovePatch = (basketItem) => {
    if (basketItem.quantity > 1) {
      const opts = {
        method: 'PATCH',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          quantity: basketItem.quantity - 1,
        }),
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts);
      return;
    }
    if (basketItem.quantity === 1) {
      const opts = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      };
      fetch(`http://localhost:4000/item/basket/${basketItem.id}`, opts);
    }
  };

  return (
    <>
      {basketItem.category !== 'patches' && (
        <li key={basketItem.id}>
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
      )}
      {basketItem.category === 'patches' && (
        <li>
          <p>{basketItem.description}</p>
          <span>{basketItem.price}</span>
          <button onClick={() => handleAddPatch(basketItem)}>+</button>
          <button onClick={() => handleRemovePatch(basketItem)}>-</button>
          <span>{basketItem.quantity}</span>
        </li>
      )}
    </>
  );
}
