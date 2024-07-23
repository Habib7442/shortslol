import { getFreeTokensUsed } from './getFreeTokensUsed';
import { getCurrentSubscription } from '../subscriptions/getCurrentSubscription';

export const getTokensUsed = async (userID: string): Promise<number> => {
  const subscription = await getCurrentSubscription(userID);

  if (!subscription) {
    const freeTokens = await getFreeTokensUsed(userID);

    return freeTokens;
  }

  return subscription.tokens_used;
};
