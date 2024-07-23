import { supabase } from "@/lib/supabaseClient";

const SUBSCRIPTIONS_TABLE = "subscriptions";
type SubscriptionTable = {
  id: number;
  stripe_subscription_id: string;
  user_id: string;
  plan: string;
  status: string;
  created_at: string; // or Date if you plan to convert it
};

export const getCurrentSubscription = async (
  userID: string
): Promise<null | SubscriptionTable> => {
  const { data, error } = await supabase
    .from(SUBSCRIPTIONS_TABLE)
    .select("*")
    .eq("user_id", userID)
    .order("start_date", { ascending: false })
    .limit(1);

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching subscription:", error);
    return null;
  }

  return data[0] || null;
};
