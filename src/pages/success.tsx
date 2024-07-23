// pages/success.tsx

import { PaymentType } from '@shortslol/common';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { getCheckoutSession, initiateSubscription } from '@/lib';

import ButtonLink from '@/components/links/ButtonLink';

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchSessionAndSetUser = async () => {
      const sessionId = router.query.session_id as string;

      if (sessionId) {
        const session = await getCheckoutSession(sessionId);

        console.log('got here', session);

        if (!session) {
          throw new Error('Session not found');
        }

        // eslint-disable-next-line no-console
        console.log(session);

        const priceId = session.metadata?.priceId;

        if (!priceId) {
          throw new Error('PriceID not found in Stripe session');
        }

        const paymentType = session.metadata?.paymentType as PaymentType;

        if (!paymentType) {
          throw new Error('Payment type not found in Stripe session');
        }

        const userId = session.metadata?.userId;

        if (!userId) {
          throw new Error('User ID not found in Stripe session');
        }

        await initiateSubscription(userId, sessionId, paymentType);

        router.push('/dashboard');
      }
    };

    fetchSessionAndSetUser();
  }, [router, router.query.session_id]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-y-4 text-center'>
      <h1>Payment successful! ✅</h1>
      <p>You will automatically be redirected to the dashboard.</p>
      <p className='text-center text-gray-500'>
        Any issues please reach out to team@shorts.lol
      </p>
      <ButtonLink variant='dark' href='/dashboard'>
        Back to home
      </ButtonLink>
    </div>
  );
};

export default Success;
