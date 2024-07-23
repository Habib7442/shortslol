import React, { ReactNode } from 'react';
import Select from 'react-select';

import clsxm from '@/lib/clsxm';

import { StyledLabel } from './Label';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    minHeight: '35px', // Adjust this as necessary
    height: '42px',
    color: '#374151',
    borderColor: state.isFocused ? '#6366f1' : '#d1d5db', // Adjust to match your focus colors
    '&:hover': {
      borderColor: '#d1d5db',
    },
    borderRadius: '0.375rem', // rounded-md
    borderWidth: '1px',
  }),
  input: (provided: any) => ({
    ...provided,
    fontSize: '0.875rem', // sm:text-sm
    color: '#374151',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: '0.875rem', // sm:text-sm
    color: '#374151',
  }),
  // Add other style customizations as needed
};

type OptionType = {
  value: string | number;
  label: string;
  suffix?: ReactNode;
};

type StyledSelectProps = {
  selectName: string;
  labelName: string;
  options: OptionType[];
  value?: OptionType;
  disabled?: boolean;
  className?: string;
  onChange?: (selectedOption: OptionType | null) => void;
  required?: boolean;
  isSearchable?: boolean;
};

const CustomOption = ({
  data,
  ...props
}: {
  data: OptionType;
  innerProps: any;
  label: string;
}) => (
  <div
    {...props.innerProps}
    className='flex cursor-default items-center justify-between gap-y-2 px-2 text-sm text-gray-700 hover:bg-gray-50'
  >
    <span>{data.label}</span>
    {data.suffix && (
      <span
        className='suffix'
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {data.suffix}
      </span>
    )}
  </div>
);

const StyledSelect: React.FC<StyledSelectProps> = ({
  selectName,
  labelName,
  options,
  value,
  disabled = false,
  className,
  onChange,
  required = false,
  isSearchable = false,
}) => {
  return (
    <div className={clsxm('text-left', className)}>
      <StyledLabel
        name={selectName}
        labelName={labelName}
        required={required}
      />

      <div className='mt-1'>
        <Select
          id={selectName}
          name={selectName}
          isDisabled={disabled}
          value={value}
          onChange={(selectedOption: any) => {
            if (onChange) {
              onChange(selectedOption);
            }
          }}
          options={options}
          isSearchable={isSearchable}
          classNamePrefix='react-select'
          components={{
            Option: CustomOption,
          }}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default StyledSelect;
