// import {
//   PaymentType,
//   SUBSCRIPTIONS_TABLE,
//   SubscriptionStatus,
// } from '@shortslol/common';

import { supabase } from '../supabaseClient';

type PaymentType = 'BASIC' | 'PREMIUM' | 'PRO';

// Define SubscriptionStatus as an enum with the expected values
enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
}

const SUBSCRIPTIONS_TABLE = "subscriptions";

export const initiateSubscription = async (
  userId: string,
  stripeSubscriptionId: string,
  tier: PaymentType
): Promise<Date> => {
  // Calculate the new expiration date (current time + 1 month)
  const now = new Date();
  const newExpirationDate = new Date(now.setMonth(now.getMonth() + 1));

  // Define the object to insert with explicit type
  const subscription = {
    stripe_subscription_id: stripeSubscriptionId,
    user_id: userId,
    tier,
    status: SubscriptionStatus.ACTIVE,
    start_date: now.toISOString(),
    end_date: newExpirationDate.toISOString(),
    tokens_used: 0,
  };

  const { error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .insert(subscription);

  if (error) throw error;

  return newExpirationDate;
};
