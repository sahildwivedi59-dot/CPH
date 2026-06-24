-- Run this after creating the admin user in Supabase Authentication > Users.
-- This grants admin panel access to the configured CPH admin email.

insert into public.admin_users (user_id, email, role)
select id, email, 'admin'
from auth.users
where email = 'sahildwivedi59@gmail.com'
on conflict (email) do update
set user_id = excluded.user_id,
    role = 'admin';

notify pgrst, 'reload schema';
