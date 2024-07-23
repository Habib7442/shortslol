import { useFormContext } from 'react-hook-form';
import StyledInput, { StyledTextAreaTailwind } from '../input';
import { StyledToggle } from '../StyledToggle';
import { useState } from 'react';
import StyledSelect from '../select';
import {
  AIVoiceSelectOption,
  AI_VOICE_SELECT_OPTIONS,
} from '@/constant/createVideo/voices';
import { RainbowBorderButton } from '@/components/buttons/RainbowBorderButton';

export const AddAudio = ({
  setSelectedVoice,
  selectedVoice,
  isSubtitles,
  setIsSubtitles,
  loading,
}: {
  selectedVoice: AIVoiceSelectOption;
  setSelectedVoice: (voice: AIVoiceSelectOption) => void;
  isSubtitles: boolean;
  setIsSubtitles: (subtitles: boolean) => void;
  loading: boolean;
}) => {
  return (
    <div className='mx-auto mt-32 flex w-full max-w-lg flex-col gap-y-4'>
      <StyledSelect
        selectName='voice'
        labelName='Voice'
        value={selectedVoice}
        onChange={(selectedOption: any) => {
          if (selectedOption) {
            setSelectedVoice(selectedOption);
          }
        }}
        options={AI_VOICE_SELECT_OPTIONS}
      />
      <StyledToggle
        name='isSubtitles'
        labelName='Add subtitles'
        setValue={setIsSubtitles}
        value={isSubtitles}
      />
      <RainbowBorderButton
        className='mx-auto mt-16 w-full text-center'
        type='submit'
        loading={loading}
      >
        <p className='w-full text-center text-white'>Create</p>
      </RainbowBorderButton>
    </div>
  );
};
