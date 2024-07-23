import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '@/lib';

export default async function sendToCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { priceId, userId, paymentType } = req.body;

  // Get the protocol (http or https)
  const protocol = req.headers['x-forwarded-proto'] || 'http';

  // Get the host
  const host = req.headers['x-forwarded-host'] || req.headers['host'];

  // Construct base URL
  const baseURL = `${protocol}://${host}`;

  console.log('got here', priceId);

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      priceId,
      userId,
      paymentType,
    },
    success_url: `${baseURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseURL}/pricing`,
  });

  res.send({
    sessionId: session.id,
  });
}
