import { StyledLabel } from './Label';

type StyledInputProps = {
  inputName: string;
  labelName: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
};

export const StyledInputTailwind =
  'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';
export const StyledTextAreaTailwind =
  'block min-h-[150px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm';

const StyledInput = ({
  inputName,
  labelName,
  required = false,
  children,
  error,
}: StyledInputProps) => {
  return (
    <div className='text-left'>
      <StyledLabel
        className='mb-1'
        labelName={labelName}
        required={required}
        name={inputName}
      />

      {children}
      {error && <p className='text-sm italic text-red-500'>{error}</p>}
    </div>
  );
};

export default StyledInput;
