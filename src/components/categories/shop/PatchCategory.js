import { useParams, useLocation } from 'react-router';
import { useEffect } from 'react';

export default function PatchLists() {
  const { category } = useParams();
  const Location = useLocation();

  useEffect(() => {
    console.log(category);
    console.log(Location);
  });
}
