-- Run this in the Supabase SQL Editor. Service-role key stays server-side.
create extension if not exists pgcrypto;
create table if not exists public.contact_submissions(id uuid primary key default gen_random_uuid(),name text not null check(char_length(name) between 2 and 100),email text not null check(char_length(email)<=254),company text,topic text not null default 'General enquiry',message text not null check(char_length(message) between 10 and 5000),source text not null default 'website',created_at timestamptz not null default now());
create table if not exists public.newsletter_subscribers(id uuid primary key default gen_random_uuid(),email text not null unique check(char_length(email)<=254),source text not null default 'website',created_at timestamptz not null default now());
alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscribers enable row level security;
-- No public policies: Vercel serverless functions write with the service-role key.
