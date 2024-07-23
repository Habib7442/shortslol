import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { BsDiscord } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

import { DISCORD_SERVER_URL } from '@/constant/discord';
import { useUser } from '@/contexts';

import Logo from '../logo';

export enum NAV_ITEMS {
  DASHBOARD = 'Dashboard',
  PRICING = 'Pricing',
  CREATE = 'Create',
  SETTINGS = 'Settings',
}

type DashboardHeaderProps = {
  activeElement: NAV_ITEMS;
};

const DashboardHeader = ({ activeElement }: DashboardHeaderProps) => {
  const { logout } = useUser();

  const navItems = [
    { value: NAV_ITEMS.DASHBOARD, href: '/dashboard' },
    {
      value: NAV_ITEMS.PRICING,
      href: '/pricing',
    },
  ];

  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <Link href='https://shorts.lol'>
                    <Logo />
                  </Link>
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  {navItems.map((item) => (
                    <a
                      key={item.value}
                      href={item.href}
                      className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                        item.value === activeElement
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                    >
                      {item.value}
                    </a>
                  ))}
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* <button className='rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button> */}
                {/* Profile dropdown */}
                <div
                  onClick={() => window.open(DISCORD_SERVER_URL, '_blank')}
                  className='mr-2'
                >
                  <BsDiscord className='h-6 w-6 cursor-pointer text-indigo-500 hover:text-indigo-700' />
                </div>
                <Menu as='div' className='relative z-30 ml-3'>
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                          <span className='sr-only'>Open user menu</span>
                          <div className='relative h-8 w-8 overflow-hidden rounded-full bg-pink-500'></div>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items
                          static
                          className='absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href='/settings'
                                className={clsxm(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => logout()}
                                className={clsxm(
                                  active ? 'bg-red-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-red-700'
                                )}
                              >
                                Sign out
                              </div>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pb-4 pt-2'>
              {navItems.map((item) => (
                <a
                  key={item.value}
                  href={item.href}
                  className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium ${
                    item.value === activeElement
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                >
                  {item.value}
                </a>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardHeader;
