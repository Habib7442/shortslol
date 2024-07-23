import { VideoTable } from '@shortslol/common';
import { differenceInMinutes } from 'date-fns';
import { BiLoader } from 'react-icons/bi';
import { PiWarningBold } from 'react-icons/pi';

import { VideoGenerationStepsService } from '@/domain/services/videoGenerationStepsService';

import LoadingList from '../LoadingList';

type VideoLoadingProps = {
  video: VideoTable;
};

export const VideoLoading = ({ video }: VideoLoadingProps) => {
  const currentStep = VideoGenerationStepsService.getCurrentStep(video);

  const isLongerThanUsual = () => {
    if (video.created_at) {
      const now = new Date();
      const createdAt = new Date(video.created_at);
      const difference = differenceInMinutes(now, createdAt);
      return difference > 10;
    }
    return false;
  };

  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl border bg-white p-4'>
      {isLongerThanUsual() ? (
        <PiWarningBold className='h-6 w-6 fill-yellow-500 text-black' />
      ) : (
        <BiLoader className='h-6 w-6 animate-spin duration-1000' />
      )}
      <p className='font-bold'>
        {isLongerThanUsual() ? 'Taking longer than usual' : 'Creating Video'}
      </p>
      <LoadingList video={video} />
      <p className='text-sm text-gray-600'>
        Step time{' '}
        {VideoGenerationStepsService.getStepDurationSeconds(currentStep)}
      </p>
    </div>
  );
};
