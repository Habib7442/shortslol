import React, { useRef, useState } from 'react';
import { BsPauseCircle,BsPlayCircle } from 'react-icons/bs';

type PlayButtonProps = {
  src: string;
};

const PlayButton: React.FC<PlayButtonProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (audioRef.current) {
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
  }

  return (
    <div onClick={handleToggle} className='cursor-pointer py-1'>
      <audio ref={audioRef} src={src}></audio>
      {isPlaying ? (
        <BsPauseCircle className='h-6 w-6 text-gray-600 hover:text-gray-800' />
      ) : (
        <BsPlayCircle className='h-6 w-6 text-gray-600 hover:text-gray-800' />
      )}
    </div>
  );
};

export default PlayButton;
