

import { PopulatedUser } from "@/types/types";


// Add 'STANDARD' to TOKEN_LIMITS if needed
enum PaymentType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

const TOKEN_LIMITS: Record<PaymentType, number> = {
  [PaymentType.FREE]: 10,
  [PaymentType.BASIC]: 50,
  [PaymentType.STANDARD]: 75, 
  [PaymentType.PREMIUM]: 100
};




export class UserService {
  static hasUserReachedTokenLimit(user: PopulatedUser) {
    if (!user.subscription || !user.subscription.tier) {
      return (user.free_credits_used ?? 0) >= TOKEN_LIMITS[PaymentType.FREE];
    }

    const tier = user.subscription.tier as PaymentType;
    return (
      (user.subscription.tokens_used ?? 0) >= TOKEN_LIMITS[tier]
    );
  }

  static getUserTokenLimit(user: PopulatedUser) {
    if (!user.subscription) {
      return TOKEN_LIMITS[PaymentType.FREE];
    }

    const tier = user.subscription.tier as PaymentType;
    return TOKEN_LIMITS[tier];
  }
}

