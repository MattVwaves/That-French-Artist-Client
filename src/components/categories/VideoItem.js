import YouTube from 'react-youtube';
import { useState } from 'react';

export default function VideoItem({ displayItem }) {
  const [opts] = useState({
    height: '300px',
    width: '300px',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
    },
  });
  return (
    <>
      <YouTube videoId={displayItem.description} opts={opts} />
    </>
  );
}
