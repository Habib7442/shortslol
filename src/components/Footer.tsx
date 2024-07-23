/* eslint-disable @typescript-eslint/no-explicit-any */

import { MailIcon } from '@heroicons/react/outline';
import { FormEvent, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { FaDiscord } from 'react-icons/fa';
import { RiLinkedinBoxFill } from 'react-icons/ri';

import { DISCORD_SERVER_URL } from '@/constant/discord';

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/
const navigation = {
  social: [
    {
      name: 'Discord',
      href: DISCORD_SERVER_URL,
      icon: (props: any) => (
        <FaDiscord className='fill-currentColor' {...props} />
      ),
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/company/shortslol',
      icon: (props: any) => (
        <RiLinkedinBoxFill className='fill-currentColor' {...props} />
      ),
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/shortslol',
      icon: (props: any) => (
        <svg fill='currentColor' viewBox='0 0 24 24' {...props}>
          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
        </svg>
      ),
    },
    {
      name: 'Mail',
      href: 'mailto:team@shorts.lol',
      icon: (props: any) => (
        <MailIcon className='fill-currentColor' {...props} />
      ),
    },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const subscribe = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setSubscribeLoading(true);
      event.preventDefault();

      toast.success('Subscribed successfully');
    } catch (error) {
      toast.error('Please try again');
      // Handle error
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <footer className='bg-gray-800' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='mt-8 xl:mt-0'>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-gray-400'>
              Subscribe to our newsletter
            </h3>
            <p className='mt-4 text-base text-gray-300'>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className='mt-4 sm:flex sm:max-w-md' onSubmit={subscribe}>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                type='email'
                name='email-address'
                id='email-address'
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='email'
                required
                className='w-full min-w-0 appearance-none rounded-md border border-transparent bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                placeholder='Enter your email'
              />
              <div className='mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                  disabled={subscribeLoading}
                >
                  {subscribeLoading ? <LoaderIcon /> : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between'>
          <div className='flex space-x-6 md:order-2'>
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target='_blank'
                className='text-gray-400 hover:text-gray-300'
              >
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6' aria-hidden='true' />
              </a>
            ))}
          </div>
          <p className='mt-8 text-base text-gray-400 md:order-1 md:mt-0'>
            &copy; 2023 shorts.lol, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
