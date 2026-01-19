-- Execute este script no Editor SQL do Supabase Dashboard do seu projeto
-- Isso criará a tabela para armazenar o histórico de transações

-- 1. Cria a tabela de transações
create table if not exists transacoes (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references auth.users(id) not null,
  tipo text not null, -- 'deposit' ou 'withdraw'
  asset text not null, -- 'BRL', 'USDT', etc. (Renomeado de 'moeda' para casar com o frontend ou podemos mapear)
  amount numeric not null, -- Valor
  status text default 'completed',
  date text, -- Armazenamos a data formatada ou timestamp. O front usa string formatada por enquanto.
  details text, -- Detalhes bancários ou endereço
  created_at timestamptz default now()
);

-- 2. Habilita segurança (RLS)
alter table transacoes enable row level security;

-- 3. Cria políticas de acesso
-- Permitir que o usuário veja suas próprias transações
create policy "Usuários podem ver suas próprias transações"
on transacoes for select
to authenticated
using (auth.uid() = usuario_id);

-- Permitir que o usuário insira novas transações
create policy "Usuários podem inserir suas próprias transações"
on transacoes for insert
to authenticated
with check (auth.uid() = usuario_id);

-- 4. Opcional: Index para performance
create index if not exists idx_transacoes_usuario_id on transacoes(usuario_id);
