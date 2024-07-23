// import { VIDEOS_TABLE, VideoTable } from '@shortslol/common';

import { supabase } from "@/lib/supabaseClient";

export const getVideosByUserId = async (id: string) => {
  const VIDEOS_TABLE = "videos";
  const { data, error } = await supabase
    .from(VIDEOS_TABLE)
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as VideoTable[];
};
