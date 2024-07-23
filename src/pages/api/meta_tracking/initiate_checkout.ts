import axios from 'axios';
import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import getClientConfig from '@/lib/config/clientConfig';
import getServerConfig from '@/lib/config/serverConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the request method
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { metaConversionAPIToken } = getServerConfig();
  const { metaPixelId } = getClientConfig();

  // Collect the necessary data
  const { email, tier } = req.body;
  const clientIpAddress =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientUserAgent = req.headers['user-agent'];

  // Create the hashed email
  const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

  console.log('got here');

  // The server-side event
  try {
    const event = {
      event_name: 'InitiateCheckout',
      event_time: Math.floor(new Date().getTime() / 1000),
      event_source_url: req.headers.referer, // URL of the webpage where the event happened
      action_source: 'website', // The place where the action took place
      event_id: `${Date.now()}-${Math.random()}`,
      user_data: {
        em: hashedEmail,
        client_ip_address: clientIpAddress,
        client_user_agent: clientUserAgent,
      },
      custom_data: {
        content_name: tier.title,
        content_category: 'Checkout',
        predicted_ltv: tier.price,
        currency: 'USD',
        value: tier.price,
        contents: [
          {
            id: tier.paymentType,
            quantity: 1,
            item_price: tier.price,
          },
        ],
      },
    };

    // Send the event to the Conversion API
    await axios.post(
      `https://graph.facebook.com/v13.0/${metaPixelId}/events?access_token=${metaConversionAPIToken}`,
      {
        data: [event],
      }
    );

    res.status(200).end(); // OK
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    res.status(500).end(); // Internal Server Error
  }
}
