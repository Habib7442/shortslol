

import { PopulatedUser } from "@/types/types";

const TOKEN_LIMITS = {
  FREE: 10, // Set your actual free limit
};

export class UserService {
  static hasUserReachedTokenLimit(user: PopulatedUser) {
    if (!user.subscription || !user.subscription.tier) {
      return user.free_credits_used >= TOKEN_LIMITS.FREE;
    }

    return (
      user.subscription.tokens_used >=
      TOKEN_LIMITS[user.subscription.tier as PaymentType]
    );
  }

  static getUserTokenLimit(user: PopulatedUser) {
    if (!user.subscription) {
      return TOKEN_LIMITS.FREE;
    }

    return TOKEN_LIMITS[user.subscription.tier as PaymentType];
  }
}
