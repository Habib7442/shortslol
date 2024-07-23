// pages/api/queueOrder.ts

import AWS from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

import getServerConfig from '@/lib/config/serverConfig';

AWS.config.update({
  accessKeyId: getServerConfig().awsAccessKeyID,
  secretAccessKey: getServerConfig().awsSecretKeyID,
  region: getServerConfig().awsRegion,
});

const sqs = new AWS.SQS();
const queueURL = getServerConfig().awsQueueURL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { video_id } = req.body;

  console.log('videoId', video_id);

  if (!video_id) {
    return res.status(400).json({ error: 'Missing video ID' });
  }

  const params = {
    MessageBody: JSON.stringify({ videoId: video_id }),
    QueueUrl: queueURL,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.error('Error sending message to SQS', err);
      res.status(500).json({ error: 'Failed to queue order' });
    } else {
      res.status(200).json({ messageId: data.MessageId });
    }
  });
}
