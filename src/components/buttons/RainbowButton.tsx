import { useState } from 'react';

import clsxm from '@/lib/clsxm';

export const RainbowButton = ({
  onClick,
  title,
}: {
  onClick?: () => void;
  title: string | JSX.Element;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className='group relative inline-flex w-full'>
      <div
        className={clsxm(
          'absolute -inset-1 rotate-180 rounded-xl opacity-70 blur-lg filter transition-all duration-1000',
          {
            'group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200':
              hovered,
          }
        )}
        style={{
          background:
            'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
        }}
      ></div>

      <button
        type='submit'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='font-pj relative inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
      >
        {title}
      </button>
    </div>
  );
};
