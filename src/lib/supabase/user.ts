

import { supabase } from '../supabaseClient';
const SUBSCRIPTIONS_TABLE = "subscriptions";

type SubscriptionTable = {
  id: number;
  stripe_subscription_id: string;
  user_id: string;
  plan: string;
  status: string;
  created_at: string; // or Date if you plan to convert it
 
};


export const getUserByStripeCustomerId = async (
  stripeCustomerId: string
): Promise<SubscriptionTable | null> => {
  try {
    const { data, error } = await supabase
      .from(SUBSCRIPTIONS_TABLE)
      .select('*')
      .eq('stripe_subscription_id', stripeCustomerId)
      .single(); // assumes that stripeCustomerId is unique and can only have one match

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    if (!data) {
      console.log('No user with this stripeCustomerId found');
      return null;
    }

    return data as SubscriptionTable;
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
};
