-- SEED GBP AND TETHER DATA
-- Run this in Supabase SQL Editor to add GBP (Libra Esterlina) and Tether (USDT) balances

-- Add GBP balance (1 GBP - conversion to BRL is automatic via real-time API)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'gbp', 1.00
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo;

-- Add Tether (USDT) balance (R$ 3,62 worth of USDT)
-- Assuming 1 USDT ≈ R$ 6.00, so R$ 3,62 = ~0.6033 USDT
-- You can adjust the USDT amount based on current exchange rate
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'tether', 0.6033
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo;

-- Verify the insertions
SELECT c.moeda, c.saldo, u.email
FROM public.carteiras c
JOIN auth.users u ON c.usuario_id = u.id
WHERE u.email = 'Abidellatie1978uk@gmail.com'
ORDER BY c.moeda;
