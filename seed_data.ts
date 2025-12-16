
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwwimwhcxnxvrpdtczud.supabase.co';
const supabaseAnonKey = 'sb_publishable_Id1DC7WmjXBE4aFUfN205A_5iV3tApa';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedData() {
    console.log("Starting seed process...");

    const email = 'Abidellatie1978uk@gmail.com';
    const password = 'Brasília2020@';

    // 1. Sign in to get the User ID
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError || !user) {
        console.error("Error signing in. Cannot seed data if user is not authenticated/found.", signInError);
        return;
    }

    console.log("User found:", user.id);

    // 2. Insert/Update 'carteiras' with 7 million BRL
    console.log("Updating balance to R$ 7,000,000...");

    // We update 'brl' balance. 
    // Note: The app logic in UserContext.tsx expects 'brl' in the 'moeda' column.
    const amount = 7000000;

    const { error: upsertError } = await supabase.from('carteiras').upsert({
        usuario_id: user.id,
        moeda: 'brl',
        saldo: amount,
        atualizado_em: new Date().toISOString()
    }, { onConflict: 'usuario_id, moeda' });

    if (upsertError) {
        console.error("Error seeding wallet:", upsertError);
    } else {
        console.log(`Successfully deposited R$ ${amount.toLocaleString('pt-BR')} into user's wallet.`);
    }

    // 3. Verify
    const { data: walletData } = await supabase.from('carteiras').select('*').eq('usuario_id', user.id).eq('moeda', 'brl');
    console.log("Verification Data:", walletData);
}

seedData();
