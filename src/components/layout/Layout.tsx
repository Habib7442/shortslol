import * as React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from '@/components/layout/Footer';


export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='flex flex-col'>
      <div>
        <Toaster />
      </div>
      <div className='min-h-screen flex-grow text-center sm:mx-0'>
        {children}
      </div>
      <Footer />
    </div>
  );
}
