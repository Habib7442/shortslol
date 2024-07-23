import { ReactNode } from 'react';

export const StyledCheckbox = ({
  title,
  description,
  children,
  inputName,
  error,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
  inputName: string;
  error?: string;
}) => {
  return (
    <div className='flex flex-col items-start gap-y-2'>
      <div className='relative flex w-fit items-start'>
        <div className='flex h-5 items-center'>{children}</div>
        <div className='ml-3 select-none text-sm'>
          <label
            htmlFor={inputName}
            className='cursor-pointer font-medium text-gray-700'
          >
            {title}
          </label>
          <p className='text-gray-500'>{description}</p>
        </div>
      </div>
      <p className='text-sm italic text-red-500'>{error}</p>
    </div>
  );
};
