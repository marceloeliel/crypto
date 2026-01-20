-- Garante que a restrição de unicidade existe para que o UPSERT funcione corretamente
-- Se o usuário e moeda já existirem, atualiza. Se não, insere.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'carteiras_usuario_id_moeda_key') THEN
        ALTER TABLE public.carteiras ADD CONSTRAINT carteiras_usuario_id_moeda_key UNIQUE (usuario_id, moeda);
    END IF;
END $$;

-- Habilita segurança por linha (RLS)
ALTER TABLE public.carteiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Limpa políticas antigas para evitar conflitos/duplicação
DROP POLICY IF EXISTS "Users can view own wallet" ON public.carteiras;
DROP POLICY IF EXISTS "Users can insert own wallet" ON public.carteiras;
DROP POLICY IF EXISTS "Users can update own wallet" ON public.carteiras;
DROP POLICY IF EXISTS "Users can delete own wallet" ON public.carteiras;

DROP POLICY IF EXISTS "Users can view own transactions" ON public.transacoes;
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.transacoes;

-- Cria novas políticas corretas
-- 1. Carteiras
CREATE POLICY "Users can view own wallet"
ON public.carteiras FOR SELECT
USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert own wallet"
ON public.carteiras FOR INSERT
WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update own wallet"
ON public.carteiras FOR UPDATE
USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete own wallet"
ON public.carteiras FOR DELETE
USING (auth.uid() = usuario_id);

-- 2. Transações
CREATE POLICY "Users can view own transactions"
ON public.transacoes FOR SELECT
USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert own transactions"
ON public.transacoes FOR INSERT
WITH CHECK (auth.uid() = usuario_id);
