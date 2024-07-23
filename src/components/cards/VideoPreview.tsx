import { DownloadIcon, LinkIcon } from '@heroicons/react/outline';
import { VideoTable } from '@shortslol/common';
import { format } from 'date-fns';
import { useState } from 'react';

import { CopyService } from '@/domain';

import Button from '../buttons/Button';
import ButtonLink from '../links/ButtonLink';
import NextImage from '../NextImage';

export type VideoPreviewProps = {
  video: VideoTable;
};

export const VideoPreview = ({ video }: VideoPreviewProps) => {
  const [playing, setPlaying] = useState(false);

  if (video.url == null) {
    return <></>;
  }

  return (
    <>
      {video.url ? (
        <div className='flex cursor-pointer flex-col gap-y-2 rounded-xl border bg-white p-2 hover:border-2 sm:p-4'>
          {playing ? (
            <video src={video.url} controls className='h-full w-full' />
          ) : (
            <div
              className='relative w-full overflow-hidden rounded-xl pb-[100%]'
              onClick={() => setPlaying(true)}
            >
              {video.thumbnail_url != null ? (
                <NextImage
                  src={video.thumbnail_url}
                  layout='responsive'
                  width={1}
                  height={1}
                  alt='thumbnail'
                  className='absolute left-0 top-0 h-full w-full'
                />
              ) : (
                <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]'></div>
              )}

              <div
                className='absolute inset-0 flex h-full w-full items-center justify-center'
                aria-hidden='true'
              >
                <svg
                  className='h-20 w-20 text-indigo-500 hover:text-indigo-700'
                  fill='currentColor'
                  viewBox='0 0 84 84'
                >
                  <circle opacity='0.9' cx={42} cy={42} r={42} fill='white' />
                  <path d='M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z' />
                </svg>
              </div>
            </div>
          )}

          <p className='flex-grow text-gray-700'>
            {format(new Date(video.created_at), 'HH:mm, MMM do')}
          </p>
          <ButtonLink href={video.url} variant='dark' download>
            <span className='mx-auto flex items-center gap-x-2'>
              Download
              <DownloadIcon className='h-6 w-6' />
            </span>
          </ButtonLink>
          <Button
            onClick={() => {
              CopyService.copyText(video.url || '');
            }}
            variant='dark'
          >
            <span className='mx-auto flex items-center gap-x-2'>
              Link <LinkIcon className='h-6 w-6' />
            </span>
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
