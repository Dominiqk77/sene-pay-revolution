
-- Créer le profil Super Admin pour dominiqkmendy77@gmail.com
-- Note: L'utilisateur devra d'abord créer le compte via l'interface de signup

-- Fonction pour gérer la création automatique du super admin
CREATE OR REPLACE FUNCTION public.setup_super_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    admin_user_id uuid;
BEGIN
    -- Récupérer l'UUID de l'utilisateur une fois qu'il existe
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'dominiqkmendy77@gmail.com';
    
    -- Si l'utilisateur existe, mettre à jour son profil
    IF admin_user_id IS NOT NULL THEN
        -- Mettre à jour ou insérer le profil
        INSERT INTO public.profiles (
            id, 
            email, 
            full_name, 
            company_name, 
            role, 
            is_verified,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            'dominiqkmendy77@gmail.com',
            'Dominiqk Mendy - Super Admin',
            'SenePay Corporation',
            'super_admin',
            true,
            NOW(),
            NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
            role = 'super_admin',
            is_verified = true,
            full_name = 'Dominiqk Mendy - Super Admin',
            company_name = 'SenePay Corporation',
            updated_at = NOW();
        
        -- Créer ou mettre à jour le merchant account pour le super admin
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
            admin_user_id,
            'SenePay Master Account',
            'Payment Gateway Administration',
            'dominiqkmendy77@gmail.com',
            'pk_live_senepay_master_' || encode(gen_random_bytes(16), 'hex'),
            'sk_live_senepay_master_' || encode(gen_random_bytes(16), 'hex'),
            true,
            0,
            0,
            NOW(),
            NOW()
        )
        ON CONFLICT (user_id) DO UPDATE SET
            business_name = 'SenePay Master Account',
            business_type = 'Payment Gateway Administration',
            business_email = 'dominiqkmendy77@gmail.com',
            is_active = true,
            updated_at = NOW();
    END IF;
END;
$$;

-- Trigger pour exécuter automatiquement la configuration lors de la création du compte
CREATE OR REPLACE FUNCTION public.handle_super_admin_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Vérifier si c'est le compte super admin
    IF NEW.email = 'dominiqkmendy77@gmail.com' THEN
        -- Exécuter la configuration super admin
        PERFORM public.setup_super_admin();
    END IF;
    RETURN NEW;
END;
$$;

-- Créer le trigger pour automatiser la configuration
DROP TRIGGER IF EXISTS on_super_admin_created ON auth.users;
CREATE TRIGGER on_super_admin_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    WHEN (NEW.email = 'dominiqkmendy77@gmail.com')
    EXECUTE FUNCTION public.handle_super_admin_signup();

-- Mise à jour des politiques RLS pour s'assurer que le super admin a accès à tout
-- (Les politiques existantes devraient déjà fonctionner, mais on s'assure)

-- Policy pour permettre au super admin de voir tous les profils
DROP POLICY IF EXISTS "Super admin can view all profiles" ON public.profiles;
CREATE POLICY "Super admin can view all profiles" 
ON public.profiles FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p 
        WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
);

-- Policy pour permettre au super admin de modifier tous les profils
DROP POLICY IF EXISTS "Super admin can update all profiles" ON public.profiles;
CREATE POLICY "Super admin can update all profiles" 
ON public.profiles FOR UPDATE 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles p 
        WHERE p.id = auth.uid() AND p.role = 'super_admin'
    )
);
