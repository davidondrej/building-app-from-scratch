-- Run this in Supabase SQL Editor

create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  original_url text not null,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

create table clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references links(id) on delete cascade not null,
  source_tag text,
  country text,
  referrer text,
  timestamp timestamp with time zone default now()
);

-- Enable RLS
alter table links enable row level security;
alter table clicks enable row level security;

-- Policies: users can only manage their own links
create policy "Users can view own links" on links
  for select using (auth.uid() = user_id);

create policy "Users can insert own links" on links
  for insert with check (auth.uid() = user_id);

create policy "Users can delete own links" on links
  for delete using (auth.uid() = user_id);

-- Anyone can insert clicks (for tracking), users can read clicks on their links
create policy "Anyone can insert clicks" on clicks
  for insert with check (true);

create policy "Users can view clicks on own links" on clicks
  for select using (
    link_id in (select id from links where user_id = auth.uid())
  );

