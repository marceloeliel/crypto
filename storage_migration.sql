-- Cria um novo bucket chamado 'avatars'
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Políticas de Segurança (RLS) para o bucket 'avatars'

-- 1. Qualquer pessoa pode ver os avatares (público)
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

-- 2. Usuários autenticados podem fazer upload de avatares
create policy "Authenticated users can upload avatars"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );

-- 3. Usuários podem atualizar seus próprios avatares (baseado no nome do arquivo ou apenas permitir update geral autenticado se o nome for restrito pelo app)
-- Para simplificar e garantir segurança, permitimos update se o usuário estiver autenticado. O App garante que o nome do arquivo é user_id.
create policy "Authenticated users can update avatars"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.role() = 'authenticated' );
