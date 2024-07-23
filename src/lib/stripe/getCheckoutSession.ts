import Stripe from 'stripe';

export async function getCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session | undefined> {
  const response = await fetch('/api/stripe/get_checkout_session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  if (response.ok) {
    const { session } = await response.json();

    return session;
  } else {
    /* eslint-disable no-console */
    console.error('Failed to retrieve checkout session');
  }

  return undefined;
}
