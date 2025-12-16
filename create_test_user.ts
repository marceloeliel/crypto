
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwwimwhcxnxvrpdtczud.supabase.co';
const supabaseAnonKey = 'sb_publishable_Id1DC7WmjXBE4aFUfN205A_5iV3tApa';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
    console.log("Attempting to create user...");
    const email = 'Abidellatie1978uk@gmail.com';
    const password = 'Brasília2020@';
    const fullName = 'Abidellatie';

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) {
        console.error("Error creating user:", error.message);
    } else {
        console.log("User created successfully:", data.user);
        if (data.session) {
            console.log("Session created (auto-sign in successful).");
        } else {
            console.log("No session created. Email confirmation might be required.");
        }
    }
}

createUser();
