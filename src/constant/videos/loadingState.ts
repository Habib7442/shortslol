import { VideoGenerationStages } from "@/enums/VideoGenerationStages";

export type LoadingStateData = {
  label: string;
  duration: string;
  order: number;
};

export const LoadingStates: Record<VideoGenerationStages, LoadingStateData> = {
  [VideoGenerationStages.PROMPT]: {
    label: 'Writing script',
    duration: '∼15s',
    order: 1,
  },
  [VideoGenerationStages.VOICEOVER]: {
    label: 'Recording voice',
    duration: '∼5s',
    order: 2,
  },
  [VideoGenerationStages.SUBTITLES]: {
    label: 'Adding subtitles',
    duration: '∼10s',
    order: 3,
  },
  [VideoGenerationStages.IMAGES]: {
    label: 'Generating images',
    duration: '∼50s',
    order: 4,
  },
  [VideoGenerationStages.VIDEO]: {
    label: 'Crafting video',
    duration: '∼3min',
    order: 5,
  },
};
