-- SEED DATA
-- Run this in Supabase SQL Editor to add 7,000,000 BRL to the user's wallet.

INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'brl', 7000000
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo;

-- Verify the insertion
SELECT * FROM public.carteiras 
WHERE usuario_id = (SELECT id FROM auth.users WHERE email = 'Abidellatie1978uk@gmail.com');
