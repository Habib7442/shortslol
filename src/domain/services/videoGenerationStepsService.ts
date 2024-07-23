// import {
//   VIDEO_GENERATION_ORDER,
//   VideoGenerationStages,
//   VideoTable,
// } from '@shortslol/common';

import { LoadingStates } from "@/constant/videos/loadingState";

// Assuming these are the possible stages of video generation
enum VideoGenerationStages {
  PROMPT = "PROMPT",
  IMAGES = "IMAGES",
  VOICEOVER = "VOICEOVER",
  SUBTITLES = "SUBTITLES",
  VIDEO = "VIDEO",
}

// Define the structure of a video object
interface VideoTable {
  has_prompt: boolean;
  has_images: boolean;
  has_voiceover: boolean;
  has_subtitles: boolean;
  url: string | null;
}

const VIDEO_GENERATION_ORDER: VideoGenerationStages[] = [
  VideoGenerationStages.PROMPT,
  VideoGenerationStages.IMAGES,
  VideoGenerationStages.VOICEOVER,
  VideoGenerationStages.SUBTITLES,
  VideoGenerationStages.VIDEO,
];

export class VideoGenerationStepsService {
  static isStepComplete = (
    video: VideoTable,
    step: VideoGenerationStages
  ): boolean => {
    switch (step) {
      case VideoGenerationStages.PROMPT:
        return video.has_prompt === true;
      case VideoGenerationStages.IMAGES:
        return video.has_images === true;
      case VideoGenerationStages.VOICEOVER:
        return video.has_voiceover === true;
      case VideoGenerationStages.SUBTITLES:
        return video.has_subtitles === true;
      case VideoGenerationStages.VIDEO:
        return video.url != null;
      default:
        return false;
    }
  };

  static getCurrentStep(video: VideoTable): VideoGenerationStages {
    for (let i = VIDEO_GENERATION_ORDER.length - 1; i >= 0; i--) {
      const field = VIDEO_GENERATION_ORDER[i];
      const isStepComplete = VideoGenerationStepsService.isStepComplete(
        video,
        field
      );

      if (isStepComplete) {
        return VIDEO_GENERATION_ORDER[i + 1];
      }
    }

    return VIDEO_GENERATION_ORDER[0];
  }

  static getStepIndex(step: VideoGenerationStages | null): number {
    if (step == null) {
      return -1;
    }

    return VIDEO_GENERATION_ORDER.indexOf(step);
  }

  static getStepDurationSeconds(step: VideoGenerationStages): string {
    return LoadingStates[step].duration;
  }
}
