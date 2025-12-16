-- INSERIR SALDO DE R$ 874.000 EM LIBRAS ESTERLINAS (GBP)
-- Execute este script no Supabase SQL Editor

-- Cálculo: R$ 874.000 ÷ taxa GBP/BRL atual
-- Considerando taxa aproximada de 1 GBP = R$ 7,24
-- 874.000 ÷ 7,24 = aproximadamente 120.718 GBP

-- Inserir saldo em GBP (o sistema converterá automaticamente para BRL usando a taxa em tempo real)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'gbp', 120718.00  -- Aproximadamente 120.718 GBP = R$ 874.000
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET 
    saldo = EXCLUDED.saldo,
    atualizado_em = NOW();

-- Verificar o saldo inserido
SELECT 
    c.moeda,
    c.saldo as quantidade_gbp,
    c.atualizado_em,
    u.email
FROM public.carteiras c
JOIN auth.users u ON c.usuario_id = u.id
WHERE u.email = 'Abidellatie1978uk@gmail.com' 
AND c.moeda = 'gbp';

-- NOTA: O valor exato em BRL será calculado automaticamente pela aplicação
-- usando a taxa de câmbio em tempo real da API exchangerate-api.com
-- A taxa pode variar, então o valor em BRL pode ser ligeiramente diferente de R$ 874.000
