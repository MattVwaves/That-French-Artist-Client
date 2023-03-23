import Title from './Title';
// import Pages from './Pages';

export default function HomePage({ showTitle, setShowTitle }) {
  return <>{showTitle && <Title />}</>;
}
