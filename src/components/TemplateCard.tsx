/* eslint-disable @next/next/no-img-element */
import { format } from 'date-fns';
import { useRef, useState } from 'react';

type TemplateCardProps = {
  status: string;
  createdAt?: string;
};

const TemplateCard = ({ createdAt, status }: TemplateCardProps) => {
  const [isShown, setShown] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={divRef}
      className='relative mx-auto flex w-full cursor-pointer items-center rounded-lg border-2 bg-white px-3 py-2 hover:border-gray-500 sm:w-fit sm:min-w-[400px] sm:min-w-[400px]'
    >
      <div className='flex h-full w-full flex-col items-start gap-y-4'>
        <div className='flex w-full items-center justify-between gap-x-6'>
          <h4>{createdAt && format(new Date(createdAt), 'HH:mm, MMM do')}</h4>
        </div>
        <p>Status: {status}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
