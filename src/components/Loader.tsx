import clsxm from '@/lib/clsxm';

import LoaderSVG from '~/svg/Loader.svg';

const Loader = ({ className = '' }: { className?: string }) => {
  return (
    <LoaderSVG
      className={clsxm(
        'h-6 w-6 animate-spin text-gray-700 duration-100',
        className
      )}
    />
  );
};

export default Loader;
