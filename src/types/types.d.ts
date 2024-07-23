export interface Subscription {
  id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  tier: string; 
  tokens_used: number;
}

export interface PopulatedUser {
  id: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  subscription?: Subscription;
  
  // Add the missing property
  free_credits_used?: number; // or another appropriate type
}
