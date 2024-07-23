import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

import clientConfig from '@/lib/config/clientConfig';

enum PaymentType {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export const redirectToCheckout = async (
  userId: string,
  email: string,
  paymentType: PaymentType,
  discountCode?: string
) => {
  const priceId =
    paymentType === PaymentType.BASIC
      ? clientConfig().stripePriceIdBasic
      : paymentType === PaymentType.STANDARD
      ? clientConfig().stripePriceIdPlus
      : clientConfig().stripePriceIdPremium;

  const stripe = await loadStripe(clientConfig().stripePublicKey);

  const endpoint = 'stripe/create_subscription';

  const response = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, priceId, email, discountCode, paymentType }),
  });

  const { sessionId } = await response.json();

  if (!stripe) {
    /* eslint-disable no-console */
    console.error('Stripe.js not loaded');
    return;
  }

  if (!sessionId) {
    /* eslint-disable no-console */
    toast.error('Please try again');
    return;
  }

  await stripe.redirectToCheckout({ sessionId });
};
