import { RiFlashlightLine } from 'react-icons/ri';

const Logo = () => {
  return (
    <div className='animate-colorPulse flex items-center text-indigo-800'>
      <RiFlashlightLine className='animate-colorPulse h-6 w-auto text-indigo-600 sm:h-8' />
      <p className='font-bold'>Shorts.lol</p>
    </div>
  );
};

export default Logo;
