import { Link } from 'react-router-dom';

export default function PageTitle({ pageTitle }) {
  return (
    <>
      <img src={require(`../../assets/home/${pageTitle}.png`)} alt="page" />
      <h2 id={pageTitle}>
        <Link
          style={{
            color: 'inherit',
            textDecoration: 'inherit',
            backgroundColor: 'inherit',
          }}
          to={pageTitle}
        >
          {' '}
          {pageTitle}
        </Link>
      </h2>
    </>
  );
}
