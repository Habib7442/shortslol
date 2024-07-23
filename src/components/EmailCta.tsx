import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';

import { addEmail } from '@/lib/supabase/addEmail';

import { useUser } from '@/contexts';

import { RainbowButton } from './buttons/RainbowButton';

const EmailCTA = () => {
  const { email, setEmail } = useUser();

  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const router = useRouter();

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !emailPattern.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      setSubscribeLoading(true);

      if (email) {
        await addEmail({
          email,
        });
      }

      router.push(`/create?new=true`);
    } catch (error) {
      toast.error('Please try again');
      // Handle error
    }
  };

  return (
    <>
      <p className='text-base font-medium text-gray-900'>
        Get started for free now, it only takes 30 seconds!
      </p>
      <form onSubmit={subscribe} className='mt-3 flex flex-col gap-y-3'>
        <label htmlFor='cta-email' className='sr-only'>
          Email
        </label>
        <input
          type='text'
          name='cta-email'
          id='cta-email'
          aria-label='cta-email'
          value={email || ''}
          onChange={(e) => setEmail(e.target.value)}
          className='z-30 block w-full rounded-md border-gray-300 py-3 text-base placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:flex-1'
          placeholder='Enter your email'
        />
        <div className='sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center'>
          <RainbowButton
            title={
              subscribeLoading ? (
                <LoaderIcon className='mx-auto' />
              ) : (
                'GET STARTED!'
              )
            }
          />
        </div>
      </form>
      <p className='mt-3 text-sm text-gray-500'>
        We care about the protection of your data. Read our{' '}
        <Link
          href='/tos'
          target='_blank'
          className='font-medium text-gray-900 underline'
        >
          Privacy Policy
        </Link>
        .
      </p>
    </>
  );
};

export default EmailCTA;
