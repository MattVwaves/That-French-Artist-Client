import { Link } from 'react-router-dom';

export default function CategoryTitle({ category, page, i }) {
  return (
    <li key={category} className="category">
      <Link
        style={{
          color: 'inherit',
          textDecoration: 'inherit',
          backgroundColor: 'inherit',
        }}
        to={`/${page}/${category}`}
      >
        <h3 key={category}>{category}</h3>
        <img
          key={i}
          src={require(`../../assets/categories/${category}.png`)}
          height="100px"
          alt={category}
        />
      </Link>
    </li>
  );
}
