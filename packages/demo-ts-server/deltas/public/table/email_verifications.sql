//// CHANGE name=20180822a

create table email_verifications (
  id uuid not null primary key,
  email text not null,
  code text not null,
  fails integer not null,
  user_id uuid references users (id) on update cascade on delete cascade,
  auth_token uuid not null unique,
  verified_at timestamp with time zone,
  used_at timestamp with time zone,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on email_verifications (created_at);
create index on email_verifications (updated_at);
create index on email_verifications (deleted_at);
create index on email_verifications (auth_token);

GO
