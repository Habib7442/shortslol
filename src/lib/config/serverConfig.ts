/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { app_mode, ModeType } from '@/lib/config/mode';

// serverConfig.ts
interface ServerConfig {
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  metaConversionAPIToken: string;
  awsAccessKeyID: string;
  awsSecretKeyID: string;
  awsRegion: string;
  awsQueueURL: string;
}

function getServerConfig(): ServerConfig {
  const config: ServerConfig = {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    metaConversionAPIToken: process.env.META_CONVERSION_API_TOKEN!,
    awsAccessKeyID: process.env.AWS_ACCESS_KEY_ID!,
    awsSecretKeyID: process.env.AWS_SECRET_ACCESS_KEY!,
    awsRegion: process.env.AWS_REGION!,
    awsQueueURL: process.env.AWS_QUEUE_URL!,
  };

  if (app_mode == ModeType.TEST) {
    config.stripeSecretKey = process.env.STRIPE_SECRET_KEY_TEST!;
  }

  return config;
}

export default getServerConfig;
