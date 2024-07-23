import { ArrowLeftIcon } from '@heroicons/react/outline';
import { format, parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

import { getTokensUsed } from '@/lib/supabase/tokens/getTokensUsed';

import StyledInput, { StyledInputTailwind } from '@/components/forms/input';
import DashboardHeader, { NAV_ITEMS } from '@/components/headers/dashboardHeader';

import { useUser } from '@/contexts';
import { StringService } from '@/domain';
import withAuth from '@/hoc/withAuth';

enum PaymentType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

const TOKEN_LIMITS = {
  FREE: 10,
  BASIC: 20,
  STANDARD: 50,
  PREMIUM: 100
};

type Subscription = {
  tier: PaymentType;
  end_date: string;
}

const Settings = () => {
  const { user } = useUser();

  const [tokensUsed, setTokensUsed] = useState(-1);

  const fetchTokensUsed = useCallback(async () => {
    if (user?.id) {
      const tokens = await getTokensUsed(user.id);
      setTokensUsed(tokens);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchTokensUsed();
  }, [fetchTokensUsed]);

  return (
    <div>
      <DashboardHeader activeElement={NAV_ITEMS.SETTINGS} />
      <div className='flex items-center justify-center'>
        <div className='relative mt-4 w-full max-w-7xl px-4 sm:mt-16 sm:px-6 lg:px-8'>
          <div className='relative mx-auto'>
            <div
              className='absolute left-0 top-0 ml-2 hidden cursor-pointer sm:block'
              onClick={() => {
                window.history.back();
              }}
            >
              <ArrowLeftIcon className='h-6 w-6 text-gray-600 hover:text-gray-800' />
            </div>
          </div>
          <div className='mt-0 w-full sm:mx-auto sm:w-fit'>
            <h1 className='text-lg font-medium leading-6 text-gray-900'>
              Settings
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              Manage your account settings, view rate limits and more.
            </p>
            <div className='mt-4 flex flex-col gap-y-4'>
              <StyledInput inputName='tokensLeft' labelName='Videos created'>
                <input
                  disabled
                  className={StyledInputTailwind}
                  value={
                    tokensUsed < 0
                      ? 'Loading...'
                      : `${tokensUsed} / ${
                          TOKEN_LIMITS[
                            (user?.subscription?.tier as PaymentType) ||
                              PaymentType.FREE
                          ]
                        }`
                  }
                />
              </StyledInput>
              <StyledInput inputName='plan' labelName='Plan'>
                <input
                  disabled
                  className={StyledInputTailwind}
                  value={StringService.toPascalCase(
                    user?.subscription?.tier || PaymentType.FREE
                  )}
                />
              </StyledInput>
              <StyledInput inputName='plan' labelName='Renews on'>
                <input
                  disabled
                  className={StyledInputTailwind}
                  value={
                    user?.subscription?.end_date
                      ? format(
                          parseISO(user.subscription.end_date),
                          'MMMM d, yyyy'
                        )
                      : 'Never'
                  }
                />
              </StyledInput>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Settings);
