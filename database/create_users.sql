-- Roles para controle de acesso (padrão Supabase)
CREATE ROLE reservation_manager INHERIT;
GRANT authenticated TO reservation_manager;
GRANT reservation_manager TO authenticator;

CREATE ROLE reservation_request INHERIT;
GRANT authenticated TO reservation_request;
GRANT reservation_request TO authenticator;

create or replace function make_user_reservation_manager(user_email text)
returns void
language plpgsql
as $$
begin
    UPDATE auth.users SET role = 'reservation_manager' WHERE email = user_email;
end;
$$;

create or replace function make_user_reservation_request(user_email text)
returns void
language plpgsql
as $$
begin
    UPDATE auth.users SET role = 'reservation_request' WHERE email = user_email;
end;
$$;

REVOKE ALL ON FUNCTION public.make_user_reservation_request(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.make_user_reservation_request(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.make_user_reservation_request(text) TO dashboard_user;

REVOKE ALL ON FUNCTION public.make_user_reservation_manager(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.make_user_reservation_manager(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.make_user_reservation_manager(text) TO dashboard_user;


-- Depois de criar o usuário, executar as seguintes linhas para tornar o usuário um gerente de reserva ou um solicitante de reserva
-- select public.make_user_reservation_manager('manager@mail.com');
-- select public.make_user_reservation_request('request@mail.com');

-- select email, role from auth.users