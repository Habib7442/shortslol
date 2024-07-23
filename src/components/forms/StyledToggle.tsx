import { StyledLabel } from './Label';
import Toggle from '../buttons/Toggle';

export const StyledToggle = ({
  name,
  labelName,
  required = false,
  value,
  setValue,
}: {
  name: string;
  labelName: string;
  required?: boolean;
  value: boolean;
  setValue: (value: boolean) => void;
}) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <StyledLabel labelName={labelName} name={name} required={required} />

      <div className='mt-1'>
        <Toggle value={value} setValue={setValue} />
      </div>
    </div>
  );
};
