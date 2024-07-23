// import { EMAILS_TABLE } from '@shortslol/common';

import { supabase } from '../supabaseClient';

type AddEmailProps = {
  email: string;
};

// export const addEmail = async ({ email }: AddEmailProps) => {
//   // Check if the email already exists in the table
//   const { data, error } = await supabase
//     .from(EMAILS_TABLE)
//     .select('email')
//     .eq('email', email)
//     .limit(1);

//   if (error) throw error;

//   // If the email is not found in the table, insert it
//   if (data && data.length === 0) {
//     const { error: insertError } = await supabase.from(EMAILS_TABLE).insert({
//       email,
//     });

//     if (insertError) throw insertError;
//   }
// };
