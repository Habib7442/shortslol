import { ReactNode } from 'react';
import PlayButton from '@/components/buttons/AudioPlayButton';

enum AIVoices {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
}

enum AIVoiceIDs {
  MAN = 'MAN_ID',
  WOMAN = 'WOMAN_ID',
}

export type AIVoiceSelectOption = {
  value: AIVoices;
  label: string;
  suffix: ReactNode;
};

export const AI_VOICE_DETAILS: {
  [key in AIVoices]: {
    label: string;
    src: string;
    elevenLabsId: string;
  };
} = {
  [AIVoices.MAN]: {
    label: 'Male',
    src: '/audio/maledemo.mp3',
    elevenLabsId: AIVoiceIDs.MAN,
  },
  [AIVoices.WOMAN]: {
    label: 'Female',
    src: '/audio/femaledemo.mp3',
    elevenLabsId: AIVoiceIDs.WOMAN,
  },
};

export const AI_VOICE_SELECT_OPTIONS: AIVoiceSelectOption[] = Object.entries(
  AIVoices
).map(([_, value]) => ({
  value: value as AIVoices, // Cast is needed here
  label: AI_VOICE_DETAILS[value as AIVoices].label,
  suffix: <PlayButton src={AI_VOICE_DETAILS[value as AIVoices].src} />,
}));
