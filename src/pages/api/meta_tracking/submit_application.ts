// /pages/api/submit_application.ts

import axios from 'axios';
import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

import getClientConfig from '@/lib/config/clientConfig';
import getServerConfig from '@/lib/config/serverConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { contentName, email } = req.body;

  if (!contentName || !email) {
    return res
      .status(400)
      .json({ message: 'Bad Request: contentName and email are required' });
  }

  try {
    const { metaPixelId } = getClientConfig();
    const { metaConversionAPIToken } = getServerConfig();

    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    const data = {
      data: [
        {
          event_name: 'SubmitApplication',
          event_time: Math.floor(new Date().getTime() / 1000), // current time in seconds
          event_id: `${Date.now()}-${Math.random()}`,
          user_data: {
            client_user_agent: req.headers['user-agent'], // User agent of the browser making the request
            client_ip_address:
              req.headers['x-forwarded-for'] || req.socket.remoteAddress, // Client's IP address
            email: hashedEmail, // Email address provided in the request body
          },
          custom_data: {
            content_name: contentName,
            event_source_url: req.headers.referer, // URL of the webpage where the event happened
          },
          action_source: 'website',
        },
      ],
    };

    const endpoint = `https://graph.facebook.com/v13.0/${metaPixelId}/events?upload_tag=SubmitApplication&access_token=${metaConversionAPIToken}`;

    await axios.post(endpoint, data);

    return res
      .status(200)
      .json({ message: 'Event sent to Facebook Conversions API' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      'Error sending event to Facebook Conversions API:',
      error.message
    );
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
