//// CHANGE name=20180822a

create table projects (
  id uuid not null primary key,
  user_id uuid not null references users (id) on update cascade on delete cascade,
  name text not null,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone not null,
  updated_at timestamp with time zone not null
);

create index on projects (created_at);
create index on projects (updated_at);
create index on projects (deleted_at);
create index on projects (user_id);

GO
