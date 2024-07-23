import { ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

import Loader from '../Loader';

export const RainbowBorderButton = ({
  children,
  onClick,
  className,
  loading = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsxm(
        'group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md p-1 font-bold',
        loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className
      )}
    >
      <span className='absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]'></span>
      <span className='duration-400 relative flex w-full items-center gap-x-2 rounded-md bg-gray-900 px-6 py-3 transition-all ease-out group-hover:bg-opacity-0'>
        {loading ? (
          <span className='w-full text-center'>
            <Loader className='w-full text-center text-white' />
          </span>
        ) : (
          children
        )}
      </span>
    </button>
  );
};
