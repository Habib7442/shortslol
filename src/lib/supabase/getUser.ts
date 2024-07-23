import { PopulatedUser } from "@/types/types";
import { supabase } from "../supabaseClient";

const USERS_TABLE = "users";
const SUBSCRIPTIONS_TABLE = "subscriptions"; // Ensure this table exists and is correctly named

export const getUser = async (
  userId: string,
  email?: string
): Promise<PopulatedUser | null> => {
  try {
    // Fetch user data from the USERS_TABLE
    let { data: userData, error: userError } = await supabase
      .from(USERS_TABLE)
      .select("*")
      .eq("id", userId)
      .single();

    console.log("User data from custom table:", userData);
    console.log("User error:", userError);

    if (userError && userError.code === 'PGRST116') {
      // User not found, create a new user
      const newUser: Partial<PopulatedUser> = {
        id: userId,
        email: email || '',
        free_credits_used: 0,
        created_at: new Date().toISOString(),
      };

      const { data: insertedUser, error: insertError } = await supabase
        .from(USERS_TABLE)
        .insert(newUser)
        .single();

      if (insertError) {
        console.error("Error creating new user:", insertError);
        return null;
      }

      userData = insertedUser;
    } else if (userError) {
      console.error("Error fetching user:", userError);
      return null;
    }

    if (!userData) {
      console.error("No user data available after fetch/insert");
      return null;
    }

    const populatedUser: PopulatedUser = {
      ...userData,
      email: email || userData.email,
    };

    console.log("User data:", populatedUser);

    // Fetch the most recent subscription
    const { data: subscriptionData, error: subscriptionError } = await supabase
      .from(SUBSCRIPTIONS_TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("start_date", { ascending: false })
      .limit(1);

    if (subscriptionError) {
      console.error("Error fetching subscription:", subscriptionError);
    }

    if (subscriptionData && subscriptionData.length > 0) {
      populatedUser.subscription = subscriptionData[0];
    }

    return populatedUser;
  } catch (error) {
    console.error("Unexpected error in getUser:", error);
    return null;
  }
};
