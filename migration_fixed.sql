-- Cria tabela de perfis de usuário
create table if not exists perfis (
  id uuid references auth.users not null primary key,
  nome_completo text,
  avatar_url text,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativa RLS para perfis
alter table perfis enable row level security;

create policy "Usuários podem ver seu próprio perfil"
  on perfis for select
  using ( auth.uid() = id );

create policy "Usuários podem atualizar seu próprio perfil"
  on perfis for update
  using ( auth.uid() = id );

create policy "Usuários podem inserir seu próprio perfil"
  on perfis for insert
  with check ( auth.uid() = id );

-- Cria tabela de carteiras (saldos)
create table if not exists carteiras (
  id uuid primary key default gen_random_uuid(), -- Usa gen_random_uuid que é nativo
  usuario_id uuid references perfis(id) not null,
  moeda text not null, -- 'brl', 'bitcoin', etc.
  saldo numeric default 0,
  atualizado_em timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(usuario_id, moeda)
);

-- Ativa RLS para carteiras
alter table carteiras enable row level security;

-- Política abrangente para SELECT, INSERT, UPDATE, DELETE
create policy "Usuários podem gerenciar suas próprias carteiras"
  on carteiras for all
  using ( auth.uid() = usuario_id )
  with check ( auth.uid() = usuario_id );

-- Função para criar perfil automaticamente (opcional, mas boa prática)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.perfis (id, nome_completo, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', '');
  
  -- Cria saldo inicial BRL zerado (ou com bônus se desejar)
  insert into public.carteiras (usuario_id, moeda, saldo)
  values (new.id, 'brl', 0.00);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para executar a função na criação de usuário
-- Remove a anterior para evitar duplicidade se já existir
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
