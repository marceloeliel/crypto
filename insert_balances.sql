-- SCRIPT PARA INSERIR SALDOS MANUALMENTE
-- Execute este script no Supabase SQL Editor para adicionar valores aos seus ativos
-- Modifique os valores conforme necessário

-- ============================================
-- MOEDAS FIAT
-- ============================================

-- Real Brasileiro (BRL)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'brl', 7000000.00  -- R$ 7.000.000,00
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Libra Esterlina (GBP)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'gbp', 1000.00  -- 1.000 GBP (será convertido para BRL automaticamente)
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- ============================================
-- CRIPTOMOEDAS
-- ============================================

-- Bitcoin (BTC)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'bitcoin', 0.5  -- 0.5 BTC
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Ethereum (ETH)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'ethereum', 5.0  -- 5 ETH
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Tether/USDT (Stablecoin)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'tether', 10000.00  -- 10.000 USDT
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Solana (SOL)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'solana', 100.0  -- 100 SOL
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Dogecoin (DOGE)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'dogecoin', 50000.0  -- 50.000 DOGE
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- Cardano (ADA)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'cardano', 5000.0  -- 5.000 ADA
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET saldo = EXCLUDED.saldo, atualizado_em = NOW();

-- ============================================
-- VERIFICAR TODOS OS SALDOS
-- ============================================

SELECT 
    c.moeda,
    c.saldo,
    c.atualizado_em,
    u.email
FROM public.carteiras c
JOIN auth.users u ON c.usuario_id = u.id
WHERE u.email = 'Abidellatie1978uk@gmail.com'
ORDER BY c.moeda;
