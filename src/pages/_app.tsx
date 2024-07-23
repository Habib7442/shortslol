import { Analytics } from '@vercel/analytics/react';
import AOS from 'aos';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import 'aos/dist/aos.css';
import '@/styles/globals.css';

import { supabase } from '@/lib/supabaseClient';

import Seo from '@/components/Seo';

import { UserProvider } from '@/contexts/UserContexts';
import { VideosProvider } from '@/contexts/videosContext';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_OUT') {
          router.replace('/login');
        }
        // Handle other auth state changes if needed
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  return (
    <>
      <VideosProvider>
        <UserProvider>
          <Seo />
          <Analytics />
          <Toaster />
          <Component {...pageProps} />
        </UserProvider>
      </VideosProvider>
    </>
  );
}

export default MyApp;
