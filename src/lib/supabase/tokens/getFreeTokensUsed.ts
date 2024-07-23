// import { USERS_TABLE } from '@shortslol/common';

import { supabase } from "@/lib/supabaseClient";

const USERS_TABLE = "users";

export const getFreeTokensUsed = async (userID: string): Promise<number> => {
  const { data, error } = await supabase
    .from(USERS_TABLE)
    .select("free_credits_used")
    .eq("free_credits_used", userID)
    .single();

  if (error || !data) throw error;

  return data.free_credits_used;
};
