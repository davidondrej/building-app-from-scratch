-- Run this in Supabase SQL Editor

create table links (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  original_url text not null,
  slug text unique not null,
  created_at timestamp with time zone default now()
);

create table clicks (
  id uuid primary key default gen_random_uuid(),
  link_id uuid references links(id) on delete cascade,
  source_tag text,
  country text,
  referrer text,
  clicked_at timestamp with time zone default now()
);

-- Enable RLS
alter table links enable row level security;
alter table clicks enable row level security;

-- Policies: users can only see their own links
create policy "Users can manage own links" on links
  for all using (auth.uid() = user_id);

-- Anyone can insert clicks (for tracking), users can read clicks on their links
create policy "Anyone can insert clicks" on clicks
  for insert with check (true);

create policy "Users can view clicks on own links" on clicks
  for select using (
    link_id in (select id from links where user_id = auth.uid())
  );
