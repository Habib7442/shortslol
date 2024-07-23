import { PopulatedUser } from "@/types/types";

export const jsonStringToUser = (jsonString: string | null): PopulatedUser | null => {
  if (!jsonString) {
    console.log("No user data found in local storage");
    return null;
  }

  try {
    const userObject = JSON.parse(jsonString);

    console.log(userObject);

    if (!userObject || typeof userObject !== 'object') {
      console.log("Invalid user data in local storage");
      return null;
    }

    const user: PopulatedUser = {
      id: userObject.id || '',
      email: userObject.email || '',
      free_credits_used: userObject.free_credits_used || 0,
      created_at: userObject.created_at || '',
    };

    return user;
  } catch (error) {
    console.error("Error parsing user data from local storage:", error);
    return null;
  }
};