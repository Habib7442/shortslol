// import {
//   SUBSCRIPTIONS_TABLE,
//   TOKEN_LIMITS,
//   USERS_TABLE,
//   VIDEOS_TABLE,
// } from '@shortslol/common';
import toast from "react-hot-toast";

import { getCurrentSubscription } from "./subscriptions/getCurrentSubscription";
import { supabase } from "../supabaseClient";

const SUBSCRIPTIONS_TABLE = "subscriptions";

export const addNewVideo = async ({
  prompt,
  userID,
  voiceID,
  endingText,
  script,
  isScript,
  videoUrl,
}: {
  prompt?: string;
  userID: string;
  voiceID?: string;
  endingText?: string;
  script?: string;
  isScript?: boolean;
  videoUrl: string;
}): Promise<string> => {
  const subscription = await getCurrentSubscription(userID);

  const USERS_TABLE = "users";
  const VIDEOS_TABLE = "videos";
  const TOKEN_LIMITS = {
    FREE: 10,
  };

  if (!subscription) {
    const { data: userFreeTokensUsedData, error: userFreeTokensUsedError } =
      await supabase
        .from(USERS_TABLE)
        .select("free_credits_used")
        .eq("id", userID)
        .single();

    if (userFreeTokensUsedError) throw userFreeTokensUsedError;

    if (userFreeTokensUsedData.free_credits_used >= TOKEN_LIMITS.FREE) {
      window.location.href = "/pricing";
      toast("Exceeded monthly token limit, please upgrade");
    }

    const { data, error: updateError } = await supabase
      .from(USERS_TABLE)
      .update({
        free_credits_used: userFreeTokensUsedData.free_credits_used + 1,
      })
      .eq("id", userID);

    if (updateError) throw updateError;
  } else {
    if (
      subscription.tokens_used >=
      TOKEN_LIMITS[subscription.tier as keyof typeof TOKEN_LIMITS]
    ) {
      window.location.href = "/pricing";
      toast("Exceeded monthly token limit, please upgrade");
    }

    const { error: updateError } = await supabase
      .from(SUBSCRIPTIONS_TABLE)
      .update({
        tokens_used: subscription.tokens_used + 1,
      })
      .eq("user_id", userID);

    if (updateError) throw updateError;
  }

  const { data, error } = await supabase
    .from(VIDEOS_TABLE)
    .insert({
      prompt: prompt,
      user_id: userID,
      voice: voiceID,
      ending_text: endingText,
      script,
      user_has_script: isScript || false,
      has_prompt: false,
      has_images: false,
      has_voiceover: false,
      video_url: videoUrl,
    })
    .select()
    .single();

  if (error || !data) throw error;

  return data.id;
};
