import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryTitle({ category, page, i }) {
  useEffect(() => {
    console.log(category);
  });

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
          // height="200px"
          alt={category}
        />
      </Link>
    </li>
  );
}
