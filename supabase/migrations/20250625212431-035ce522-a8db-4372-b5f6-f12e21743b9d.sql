
-- Phase 1: Mise à jour du profil Super Admin pour Dominiqk
UPDATE public.profiles 
SET 
  role = 'super_admin',
  is_verified = true,
  company_name = 'Millennium Capital Invest',
  full_name = 'Dominiqk Mendy',
  updated_at = NOW()
WHERE email = 'dominiqk29@gmail.com';

-- Phase 2: Vérifier si le merchant account existe déjà et le créer/mettre à jour
DO $$
DECLARE
    user_uuid uuid;
BEGIN
    -- Récupérer l'UUID de l'utilisateur
    SELECT id INTO user_uuid FROM auth.users WHERE email = 'dominiqk29@gmail.com';
    
    -- Vérifier si un merchant account existe déjà
    IF EXISTS (SELECT 1 FROM public.merchant_accounts WHERE user_id = user_uuid) THEN
        -- Mettre à jour le merchant account existant
        UPDATE public.merchant_accounts 
        SET 
            business_name = 'SenePay Corporation',
            business_type = 'Fintech Payment Gateway',
            business_email = 'dominiqk29@gmail.com',
            is_active = true,
            updated_at = NOW()
        WHERE user_id = user_uuid;
    ELSE
        -- Créer un nouveau merchant account
        INSERT INTO public.merchant_accounts (
            user_id, 
            business_name, 
            business_type,
            business_email,
            api_key, 
            api_secret,
            is_active,
            monthly_volume,
            total_transactions,
            created_at,
            updated_at
        ) VALUES (
            user_uuid,
            'SenePay Corporation',
            'Fintech Payment Gateway',
            'dominiqk29@gmail.com',
            'pk_live_senepay_dominiqk_' || encode(gen_random_bytes(16), 'hex'),
            'sk_live_senepay_dominiqk_' || encode(gen_random_bytes(16), 'hex'),
            true,
            0,
            0,
            NOW(),
            NOW()
        );
    END IF;
END $$;

-- Phase 3: Mise à jour des RLS policies pour super_admin
-- Politique pour que le super_admin puisse voir tous les profils
DROP POLICY IF EXISTS "Super admin can view all profiles" ON public.profiles;
CREATE POLICY "Super admin can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Politique pour que le super_admin puisse voir tous les merchant_accounts
DROP POLICY IF EXISTS "Super admin can view all merchant accounts" ON public.merchant_accounts;
CREATE POLICY "Super admin can view all merchant accounts" 
  ON public.merchant_accounts FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Politique pour que le super_admin puisse voir toutes les transactions
DROP POLICY IF EXISTS "Super admin can view all transactions" ON public.transactions;
CREATE POLICY "Super admin can view all transactions" 
  ON public.transactions FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Politique pour que le super_admin puisse voir tous les webhook_events
DROP POLICY IF EXISTS "Super admin can view all webhook events" ON public.webhook_events;
CREATE POLICY "Super admin can view all webhook events" 
  ON public.webhook_events FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );

-- Politique pour que le super_admin puisse voir tous les audit_logs
DROP POLICY IF EXISTS "Super admin can view all audit logs" ON public.audit_logs;
CREATE POLICY "Super admin can view all audit logs" 
  ON public.audit_logs FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
  );
