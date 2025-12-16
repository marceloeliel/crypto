-- INSERIR SALDO DE R$ 586.000 EM BITCOIN (BTC)
-- Execute este script no Supabase SQL Editor

-- Cálculo: R$ 586.000 ÷ preço BTC em BRL
-- Considerando preço aproximado de 1 BTC = R$ 586.000
-- 586.000 ÷ 586.000 = 1 BTC

-- Inserir saldo em BTC (o sistema converterá automaticamente para BRL usando o preço em tempo real)
INSERT INTO public.carteiras (usuario_id, moeda, saldo)
SELECT id, 'bitcoin', 1.00  -- 1 BTC = aproximadamente R$ 586.000
FROM auth.users
WHERE email = 'Abidellatie1978uk@gmail.com'
ON CONFLICT (usuario_id, moeda) 
DO UPDATE SET 
    saldo = EXCLUDED.saldo,
    atualizado_em = NOW();

-- Verificar o saldo inserido
SELECT 
    c.moeda,
    c.saldo as quantidade_btc,
    c.atualizado_em,
    u.email
FROM public.carteiras c
JOIN auth.users u ON c.usuario_id = u.id
WHERE u.email = 'Abidellatie1978uk@gmail.com' 
AND c.moeda = 'bitcoin';

-- NOTA: O valor exato em BRL será calculado automaticamente pela aplicação
-- usando o preço em tempo real da API CoinGecko
-- O preço do Bitcoin varia constantemente, então o valor em BRL pode ser diferente de R$ 586.000
-- 
-- Se quiser um valor exato de R$ 586.000, ajuste a quantidade de BTC baseado no preço atual:
-- Exemplo: Se BTC estiver a R$ 600.000, use: 586.000 ÷ 600.000 = 0.9767 BTC
