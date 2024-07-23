/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { app_mode, ModeType } from '@/lib/config/mode';

// clientConfig.ts
interface ClientConfig {
  stripePublicKey: string;
  stripePriceIdBasic: string;
  stripePriceIdPlus: string;
  stripePriceIdPremium: string;
  mode: ModeType;
  googleAnalyticsId: string;
  googleSeoId: string;
  supabaseApiKey: string;
  supabaseUrl: string;
  metaPixelId: string;
  premiumDiscountCode: string;
}

function getClientConfig(): ClientConfig {
  const clientConfig: ClientConfig = {
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!,
    stripePriceIdBasic: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    stripePriceIdPlus: process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID!,
    stripePriceIdPremium: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
    premiumDiscountCode: process.env.NEXT_PUBLIC_PREMIUM_DISCOUNT_CODE!,

    mode: process.env.NEXT_PUBLIC_MODE! as ModeType,

    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID!,

    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!,
    googleSeoId: process.env.NEXT_PUBLIC_GOOGLE_SEO_ID!,
    supabaseApiKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  };

  if (app_mode == ModeType.TEST) {
    clientConfig.stripePublicKey =
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST!;
    clientConfig.stripePriceIdBasic =
      process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID_TEST!;
    clientConfig.stripePriceIdPlus =
      process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID_TEST!;
    clientConfig.stripePriceIdPremium =
      process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID_TEST!;
  }
  return clientConfig;
}

export default getClientConfig;
