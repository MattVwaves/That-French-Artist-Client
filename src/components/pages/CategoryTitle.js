export default function CategoryTitle({ category, i }) {
  return (
    <li key={category} className="category">
      <h3 key={category}>{category}</h3>
      <img
        key={i}
        src={require(`../../assets/categories/${category}.png`)}
        height="100px"
        alt={category}
      />
    </li>
  );
}
