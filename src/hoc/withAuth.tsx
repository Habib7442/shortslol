import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getUser } from '@/lib/supabase/getUser';
import { supabase } from '@/lib/supabaseClient';

import { useUser } from '@/contexts';

import Loader from '~/svg/Loader.svg';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { setUser, user, loadingUser } = useUser();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      if (loadingUser) return;
      const checkUser = async () => {
        try {
          const { data: currentUser, error } = await supabase.auth.getUser();
          console.log('Current User:', currentUser);
          
          if (error || !currentUser?.user?.id) {
            router.replace('/login'); // Redirect to login if not authenticated
          } else {
            const newUserData = await getUser(
              currentUser.user.id,
              currentUser.user.email
            );
            console.log('New User Data:', newUserData);
            setUser(newUserData);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          router.replace('/login');
        } finally {
          setLoading(false);
        }
      };

      checkUser();
    }, [router, setUser, loadingUser]);

    if (loading || loadingUser) {
      return (
        <div className='flex h-screen flex-col items-center justify-center'>
          <Loader className='h-6 w-6 animate-spin text-gray-700 duration-100' />
        </div>
      );
    }

    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
