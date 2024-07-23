import { useRouter } from 'next/router';

import Header from '@/components/layout/Header';

import { useUser } from '@/contexts';

import EmailCTA from './EmailCta';
import Rating from './Rating';

import AFactAbout from '~/svg/AFactAbout.svg';
import FaceBook from '~/svg/Facebook.svg';
import Instagram from '~/svg/Instagram.svg';
import TikTok from '~/svg/TikTok.svg';

export default function Hero() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className='relative min-h-[90vh] overflow-hidden bg-white'>
      <div
        className='hidden lg:absolute lg:inset-0 lg:block'
        aria-hidden='true'
      >
        <svg
          className='absolute left-1/2 top-0 -translate-y-8 translate-x-64 transform'
          width={640}
          height={784}
          fill='none'
          viewBox='0 0 640 784'
        >
          <defs>
            <pattern
              id='9ebea6f4-a1f5-4d96-8c4e-4c2abf658047'
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits='userSpaceOnUse'
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className='text-gray-200'
                fill='currentColor'
              />
            </pattern>
          </defs>
          <rect
            y={72}
            width={640}
            height={640}
            className='text-gray-50'
            fill='currentColor'
          />
          <rect
            x={118}
            width={404}
            height={784}
            fill='url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)'
          />
        </svg>
      </div>

      <div className='relative pb-16 sm:pb-24 lg:pb-32'>
        <Header />

        <main className='mx-auto mt-8 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32'>
          <div className='lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left'>
              <h1>
                <span className='block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base'>
                  Beta out now
                </span>
                <span className='mt-1 block text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl'>
                  <span className='block text-gray-900'>
                    Create short videos
                  </span>
                  <span className='block text-indigo-600'>In seconds</span>
                </span>
              </h1>
              <ul className='mt-3 flex w-full flex-col items-start justify-start gap-y-2 text-base font-semibold text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-xl'>
                <li className='sm:mx-auto lg:mx-0'>
                  🥇 Create full videos with 1 prompt
                </li>
                <li className='sm:mx-auto lg:mx-0'>
                  ⚡️ Unlimited content (TikTok, YouTube, etc)
                </li>
                <li className='sm:mx-auto lg:mx-0'>
                  🔎 No editing or coding needed
                </li>
              </ul>

              <div className='mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left'>
                {user ? (
                  <>
                    <button
                      className='mx-auto mt-4 w-fit rounded-lg border-2 bg-indigo-400 px-3 py-2 font-bold text-white hover:bg-indigo-500'
                      onClick={() => {
                        router.push('/dashboard');
                      }}
                    >
                      Go to dashboard
                    </button>
                  </>
                ) : (
                  <>
                    <EmailCTA />
                  </>
                )}
                <div className='mb-4 mt-4 flex flex-col gap-y-4 md:items-center lg:mb-0 lg:items-start'>
                  <div className='flex items-center gap-x-2'>
                    <h3 className='text-lg sm:text-sm'>As seen on:</h3>
                    <TikTok className='h-6 w-6' />
                    <Instagram className='h-6 w-6' />
                    <FaceBook className='h-6 w-6' />
                  </div>
                  <Rating />
                </div>
              </div>
            </div>
            <div className='relative sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center'>
              <div className='mt-8 flex w-full flex-col items-center gap-y-2 sm:mt-0'>
                <AFactAbout className='h-[80px] w-full' />
                <video
                  src='/videos/demo.mp4'
                  className='mx-auto w-[300px] overflow-hidden rounded-lg border-2'
                  controls
                />
                <p className='text-xs text-gray-400'>Generation time: 1min</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
