// components/Footer.tsx
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-transparent py-6'>
      <div className='container mx-auto flex flex-col gap-y-2 text-center text-sm text-gray-500'>
        <p>
          &copy; {new Date().getFullYear()} shorts.lol. All rights reserved.
        </p>
        <p>
          <Link className='hover:text-gray-700' href='mailto:team@shorts.lol'>
            team@shorts.lol
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
