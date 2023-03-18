export default function ImageItemList({ displayItem }) {
  return (
    <>
      <img
        src={require(`../../assets/${displayItem.subCategory}/${displayItem.description}.png`)}
        alt="display-item"
        height="200px"
      />
    </>
  );
}
