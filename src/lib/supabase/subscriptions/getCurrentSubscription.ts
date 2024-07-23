// import { SUBSCRIPTIONS_TABLE, SubscriptionTable } from '@shortslol/common';

import { supabase } from '@/lib/supabaseClient';

const SUBSCRIPTIONS_TABLE = "subscriptions"

export const getCurrentSubscription = async (
  userID: string
): Promise<null | SubscriptionTable> => {
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select('*')
    .eq('user_id', userID)
    .order('start_date', { ascending: false })
    .limit(1);

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data[0] || null;
};
