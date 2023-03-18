import { useEffect } from 'react';

export default function Categories({ category, setShowTitle }) {
  useEffect(() => {
    setShowTitle(false);
  });
  return (
    <>
      <h1>{category}</h1>
    </>
  );
}
