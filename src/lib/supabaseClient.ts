// import { Database } from '@shortslol/common';
import { createClient } from "@supabase/supabase-js";

import getClientConfig from "./config/clientConfig";

const { supabaseApiKey, supabaseUrl } = getClientConfig();

console.log(supabaseApiKey, supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseApiKey);
