
import { DISCORD_SERVER_URL } from '@/constant/discord';

/* This example requires Tailwind CSS v2.0+ */
export default function CTA() {
  return (
    <div className='bg-gray-50'>
      <div className='mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16'>
        <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          <span className='block'>Want to meet other big influencers?</span>
        </h2>
        <div className='mt-8 flex justify-center'>
          <div className='inline-flex rounded-md shadow'>
            <button
              onClick={() => window.open(DISCORD_SERVER_URL, '_blank')}
              className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700'
            >
              Join our Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
