import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FaDiscord } from 'react-icons/fa';
import { RiFlashlightLine } from 'react-icons/ri';

import { DISCORD_SERVER_URL } from '@/constant/discord';
import { useUser } from '@/contexts';
import { AuthService } from '@/domain';

import Logo from '../logo';

export default function Header() {
  const { user, logout } = useUser();
  const router = useRouter();

  const navigation = [
    {
      name: 'Contact',
      href: DISCORD_SERVER_URL,
      isShow: ['/'].includes(router.pathname),
    },
  ];

  const sendToDiscord = () => {
    window.open(DISCORD_SERVER_URL, '_blank');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buttons: any[] = [
    {
      title: 'Log in',
      onClick: () => AuthService.sendToLogin(router),
      isShow: !user && !['/register', '/login'].includes(router.pathname),
    },
    {
      title: 'Dashboard',
      onClick: () => router.push('/dashboard'),
      isShow: !!user && !['/dashboard'].includes(router.pathname),
    },
  ];

  return (
    <Popover>
      {({ open }) => (
        <>
          <nav
            className='relative mx-auto flex max-w-7xl items-center justify-between px-4 pt-6  sm:px-6'
            aria-label='Global'
          >
            <div className='flex flex-1 items-center'>
              <div className='flex w-full items-center justify-between md:w-auto'>
                <Link href='https://shorts.lol'>
                  <Logo />
                </Link>
                <div className='-mr-2 flex items-center md:hidden'>
                  <button
                    onClick={() => {
                      sendToDiscord();
                    }}
                    className='group flex cursor-pointer items-center gap-x-2 font-medium text-indigo-600 hover:text-indigo-800'
                  >
                    <FaDiscord className='mr-2 h-6 w-6' />
                  </button>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open main menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
              <div className='hidden md:ml-10 md:block md:space-x-10'>
                {navigation.map(
                  (item) =>
                    item.isShow && (
                      <a
                        key={item.name}
                        href={item.href}
                        target='_blank'
                        className='font-medium text-gray-500 hover:text-gray-900'
                      >
                        {item.name}
                      </a>
                    )
                )}
              </div>
            </div>
            <button
              onClick={() => {
                sendToDiscord();
              }}
              className='group mx-2 hidden cursor-pointer items-center gap-x-2 font-medium text-indigo-600 hover:text-indigo-800 md:flex'
            >
              <FaDiscord className='h-6 w-6' />
            </button>
            <div className='hidden items-center gap-x-4 text-right md:flex'>
              {buttons.length > 0 &&
                buttons.map((button, index) => {
                  return (
                    button.isShow && (
                      <span
                        key={index}
                        className='inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5'
                      >
                        <button
                          onClick={button.onClick}
                          className='inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-gray-50'
                        >
                          {button.title}
                        </button>
                      </span>
                    )
                  );
                })}
            </div>
          </nav>

          <Transition
            show={open}
            as={React.Fragment}
            enter='duration-150 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              static
              className='absolute inset-x-0 top-0 z-40 origin-top-right transform p-2 transition md:hidden'
            >
              <div className='overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5'>
                <div className='flex items-center justify-between px-5 pt-4'>
                  <div onClick={() => (window.location.href = '/')}>
                    <RiFlashlightLine className='text:fill-indigo-800 h-8 w-auto text-indigo-600 sm:h-10' />
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                      <span className='sr-only'>Close main menu</span>
                      <XIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='space-y-1 px-2 pb-3 pt-2'>
                  {navigation.map(
                    (item) =>
                      item.isShow && (
                        <a
                          key={item.name}
                          href={item.href}
                          target='_blank'
                          className='block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        >
                          {item.name}
                        </a>
                      )
                  )}
                </div>
                <div className='flex flex-col'>
                  {buttons.length > 0 &&
                    buttons.map((button, index) => {
                      return (
                        button.isShow && (
                          <span
                            key={index}
                            className='inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5'
                          >
                            <button
                              onClick={button.onClick}
                              className='block w-full bg-gray-50 px-5 py-3 text-center font-medium text-indigo-600 hover:bg-gray-100'
                            >
                              {button.title}
                            </button>
                          </span>
                        )
                      );
                    })}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
