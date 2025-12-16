
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwwimwhcxnxvrpdtczud.supabase.co';
const supabaseAnonKey = 'sb_publishable_Id1DC7WmjXBE4aFUfN205A_5iV3tApa';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
    console.log("Checking if 'perfis' table exists...");
    const { data, error } = await supabase.from('perfis').select('*').limit(1);

    if (error) {
        console.error("Error accessing 'perfis':", error.message);
        console.error("Full error:", JSON.stringify(error, null, 2));
    } else {
        console.log("Table 'perfis' exists. Data:", data);
    }
}

checkTables();
