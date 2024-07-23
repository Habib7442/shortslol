import Stripe from 'stripe';

import getServerConfig from '../config/serverConfig';

const serverConfig = getServerConfig();

export const stripe = new Stripe(serverConfig.stripeSecretKey, {
  apiVersion: '2022-11-15',
});
