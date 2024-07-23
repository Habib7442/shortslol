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
  const { email, value, currency } = req.body;
  const clientIpAddress =
    req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientUserAgent = req.headers['user-agent'];

  // Create the hashed email
  const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

  // The server-side event
  const event = {
    event_name: 'Purchase',
    event_time: Math.floor(new Date().getTime() / 1000),
    event_id: `${Date.now()}-${Math.random()}`,
    user_data: {
      em: hashedEmail,
      client_ip_address: clientIpAddress,
      client_user_agent: clientUserAgent,
    },
    custom_data: {
      currency: currency,
      value: value,
      predicted_ltv: value,
    },
    action_source: 'website',
  };

  // Send the event to the Conversion API
  try {
    await axios.post(
      `https://graph.facebook.com/v13.0/${metaPixelId}/events?access_token=${metaConversionAPIToken}`,
      {
        data: [event],
      }
    );

    res.status(200).end(); // OK
  } catch (error) {
    console.error(error);
    res.status(500).end(); // Internal Server Error
  }
}
