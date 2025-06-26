
-- Supprimer les privilèges super admin pour dominiqk29@gmail.com
UPDATE public.profiles 
SET 
  role = 'merchant',
  updated_at = NOW()
WHERE email = 'dominiqk29@gmail.com';

-- Supprimer les politiques spécifiques pour super admin qui pourraient causer des conflits
DROP POLICY IF EXISTS "Super admin can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admin can view all merchant accounts" ON public.merchant_accounts;
DROP POLICY IF EXISTS "Super admin can view all transactions" ON public.transactions;
DROP POLICY IF EXISTS "Super admin can view all webhook events" ON public.webhook_events;
DROP POLICY IF EXISTS "Super admin can view all audit logs" ON public.audit_logs;
