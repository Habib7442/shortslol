import { VideoTable } from '@shortslol/common';
import { useState } from 'react';
import { ErrorIcon } from 'react-hot-toast';

import { VideoGenerationStepsService } from '@/domain/services/videoGenerationStepsService';

type VideoErrorProps = {
  video: VideoTable;
};

export const VideoError = ({ video }: VideoErrorProps) => {
  const [showError, setShowError] = useState(false);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl border bg-white p-4 hover:border-2'>
      <ErrorIcon />
      <p className='font-bold text-red-500'>
        Failed on step{' '}
        {video != null
          ? VideoGenerationStepsService.getCurrentStep(video)
          : null}
      </p>
      <p
        className='cursor-pointer select-none text-sm text-gray-700 hover:text-gray-900'
        onClick={() => {
          setShowError(!showError);
        }}
      >
        Show error details {!showError ? '↓' : '↑'}
      </p>
      {showError && (
        <p className='text-sm text-gray-700'>{video.error_message}</p>
      )}
    </div>
  );
};
