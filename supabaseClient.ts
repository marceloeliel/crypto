
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwwimwhcxnxvrpdtczud.supabase.co';
const supabaseAnonKey = 'sb_publishable_Id1DC7WmjXBE4aFUfN205A_5iV3tApa';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Authentication will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
