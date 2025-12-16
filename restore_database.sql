-- RESTORE DATABASE SCHEMA
-- Copy this entire content and run it in the Supabase SQL Editor

-- 1. Create 'perfis' table
create table if not exists perfis (
  id uuid references auth.users not null primary key,
  nome_completo text,
  avatar_url text,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

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

-- 2. Create 'carteiras' table
create table if not exists carteiras (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references perfis(id) not null,
  moeda text not null,
  saldo numeric default 0,
  atualizado_em timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(usuario_id, moeda)
);

alter table carteiras enable row level security;

create policy "Usuários podem gerenciar suas próprias carteiras"
  on carteiras for all
  using ( auth.uid() = usuario_id )
  with check ( auth.uid() = usuario_id );

-- 3. Function to handle new user creation
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.perfis (id, nome_completo, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', '');
  
  -- Initial BRL balance
  insert into public.carteiras (usuario_id, moeda, saldo)
  values (new.id, 'brl', 0.00);
  
  return new;
end;
$$ language plpgsql security definer;

-- 4. Trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5. Storage Buckets Setup (Avatars)
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

create policy "Authenticated users can update avatars"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.role() = 'authenticated' );
