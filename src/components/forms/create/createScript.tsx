import { useFormContext } from 'react-hook-form';
import StyledInput, {
  StyledInputTailwind,
  StyledTextAreaTailwind,
} from '../input';
import { StyledCheckbox } from '../Checkbox';
import Button from '@/components/buttons/Button';
import { CreateFormType } from './validationSchema';

export const CreateScript = ({ loading }: { loading: boolean }) => {
  const { register, formState, watch } = useFormContext();
  const { errors } = formState;

  const isScript = watch('isScript');

  return (
    <div className='mx-auto mt-32 flex w-full max-w-lg flex-col gap-y-4'>
      <StyledCheckbox
        inputName='isScript'
        title='Already have a script?'
        error={errors.isScript?.message?.toString()}
      >
        <input
          id='isScript'
          type='checkbox'
          {...register('isScript')}
          className='h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
        />
      </StyledCheckbox>
      {isScript ? (
        <StyledInput
          inputName='script'
          labelName='Video script'
          required
          error={errors.script?.message?.toString()} // Accessing the error message related to the 'script' field
        >
          <textarea
            className={StyledTextAreaTailwind}
            placeholder='Did you know that...'
            {...register('script')}
          />
        </StyledInput>
      ) : (
        <StyledInput
          inputName='prompt'
          required
          labelName='Video description'
          error={errors.prompt?.message?.toString()}
        >
          <textarea
            className={StyledTextAreaTailwind}
            placeholder='A fact about entrepreneurship'
            {...register('prompt')}
          />
        </StyledInput>
      )}
      <StyledInput
        inputName='endingText'
        labelName='Ending'
        error={errors.endingText?.message?.toString()}
      >
        <input
          className={StyledInputTailwind}
          placeholder='Follow shorts.lol on TikTok!'
          {...register('endingText')}
        />
      </StyledInput>
      <Button type='submit' className='mx-auto w-fit' isLoading={loading}>
        Next - Add audio
      </Button>
    </div>
  );
};
