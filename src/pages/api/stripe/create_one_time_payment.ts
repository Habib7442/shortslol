import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { stripe } from '@/lib';

export default async function sendToCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId, email, discountCode, paymentType } = req.body;

  // Get the protocol (http or https)
  const protocol = req.headers['x-forwarded-proto'] || 'http';

  // Get the host
  const host = req.headers['x-forwarded-host'] || req.headers['host'];

  // Construct base URL
  const baseURL = `${protocol}://${host}`;

  // Define checkout session parameters
  let sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      priceId,
      email,
      paymentType,
    },
    success_url: `${baseURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseURL}/pricing`,
  };

  // If discountCode is defined, add it to the session parameters
  if (discountCode) {
    sessionParams = {
      ...sessionParams,
      discounts: [
        {
          coupon: discountCode,
        },
      ],
    };
  }

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  const session = await stripe.checkout.sessions.create(sessionParams);

  res.send({
    sessionId: session.id,
  });
}
