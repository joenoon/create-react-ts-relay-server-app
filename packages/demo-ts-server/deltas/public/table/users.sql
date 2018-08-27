//// CHANGE name=20180822a

create extension if not exists pgcrypto;

create table users (
  id uuid not null primary key,
  extid uuid not null,
  email text not null,
  name text,
  username text,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on users (created_at);
create index on users (updated_at);
create index on users (deleted_at);
create unique index on users (extid);
create unique index on users (username);
create unique index on users (email);

GO
