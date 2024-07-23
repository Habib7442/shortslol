// pages/api/get_checkout_session.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { stripe } from '@/lib';

const getCheckoutSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    try {
      const { sessionId } = req.body;

      console.log('go to retrieve session', sessionId);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.status(200).json({ session });
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default getCheckoutSession;
