import clsxm from '@/lib/clsxm';

export const StyledLabel = ({
  name,
  labelName,
  required = false,
  className,
}: {
  name: string;
  labelName: string;
  required?: boolean;
  className?: string;
}) => {
  return (
    <label
      htmlFor={name}
      className={clsxm('block text-sm font-medium text-gray-700', className)}
    >
      {labelName} {required && <span className='text-indigo-500'>*</span>}
    </label>
  );
};
