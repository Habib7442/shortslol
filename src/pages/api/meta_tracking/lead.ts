import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import getClientConfig from '@/lib/config/clientConfig';
import getServerConfig from '@/lib/config/serverConfig';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const { metaConversionAPIToken } = getServerConfig();
  const { metaPixelId } = getClientConfig();

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000), // Unix timestamp
    user_data: {
      client_user_agent: req.headers['user-agent'],
      client_ip_address:
        req.headers['x-forwarded-for'] || req.socket.remoteAddress, // Client's IP Address
    },
    custom_data: {
      content_name: req.body.contentName,
      event_source_url: req.headers.referer || 'N/A', // Source URL
    },
    action_source: 'website',
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v13.0/${metaPixelId}/events?access_token=${metaConversionAPIToken}`,
      {
        data: [event],
      }
    );

    res.status(200).json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.toString() });
  }
}
