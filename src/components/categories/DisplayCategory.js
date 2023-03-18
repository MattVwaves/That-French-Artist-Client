import { useParams } from 'react-router';

export default function DisplayCategory() {
  const { type, page } = useParams();
  return (
    <>
      <h1>{type}</h1>
      <h1>{page}</h1>
    </>
  );
}
