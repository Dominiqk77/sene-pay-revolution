
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  role: string | null;
  is_verified: boolean | null;
  created_at: string;
  updated_at: string;
}

interface MerchantAccount {
  id: string;
  user_id: string;
  business_name: string;
  business_type: string | null;
  business_email: string | null;
  business_phone: string | null;
  business_address: string | null;
  website_url: string | null;
  api_key: string | null;
  api_secret: string | null;
  is_active: boolean | null;
  monthly_volume: number | null;
  total_transactions: number | null;
  created_at: string;
  updated_at: string;
}

export const useUserRole = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [merchantAccount, setMerchantAccount] = useState<MerchantAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isSuperAdmin = profile?.role === 'super_admin';
  const isAdmin = profile?.role === 'admin';
  const isMerchant = profile?.role === 'merchant';
  const isVerified = profile?.is_verified === true;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        console.log('👤 useUserRole: No user found, clearing data');
        setProfile(null);
        setMerchantAccount(null);
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 useUserRole: Fetching user data for:', user.email);
        console.log('🔍 useUserRole: User ID:', user.id);
        
        // Récupérer le profil utilisateur
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('❌ useUserRole: Error fetching profile:', profileError);
          setError('Erreur lors du chargement du profil utilisateur');
          return;
        }

        console.log('✅ useUserRole: Profile data loaded:', profileData);
        console.log('👑 useUserRole: User role detected:', profileData?.role);
        setProfile(profileData);

        // Récupérer le compte marchand si l'utilisateur en a un
        const { data: merchantData, error: merchantError } = await supabase
          .from('merchant_accounts')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (merchantError) {
          console.error('⚠️ useUserRole: Error fetching merchant account:', merchantError);
          // Ne pas considérer comme une erreur critique si pas de merchant account
        } else if (merchantData) {
          console.log('🏪 useUserRole: Merchant account data loaded:', merchantData);
          setMerchantAccount(merchantData);
        } else {
          console.log('ℹ️ useUserRole: No merchant account found for user');
        }

        // Debug final pour le rôle Super Admin
        if (profileData?.role === 'super_admin') {
          console.log('🚨 SUPER ADMIN DETECTED! 🚨');
          console.log('👑 Profile role:', profileData.role);
          console.log('✅ isSuperAdmin will be:', profileData.role === 'super_admin');
        }

      } catch (err) {
        console.error('💥 useUserRole: Unexpected error fetching user data:', err);
        setError('Erreur inattendue lors du chargement des données');
      } finally {
        setLoading(false);
        console.log('🏁 useUserRole: Data fetching completed');
      }
    };

    fetchUserData();
  }, [user]);

  const refreshUserData = async () => {
    console.log('🔄 useUserRole: Refreshing user data...');
    setLoading(true);
    setError(null);
    
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Refetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('❌ useUserRole: Error refreshing profile:', profileError);
        setError('Erreur lors du rechargement du profil');
        return;
      }

      setProfile(profileData);

      // Refetch merchant account
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchant_accounts')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!merchantError && merchantData) {
        setMerchantAccount(merchantData);
      }

      console.log('✅ useUserRole: Data refresh completed');

    } catch (err) {
      console.error('💥 useUserRole: Error refreshing user data:', err);
      setError('Erreur lors du rechargement des données');
    } finally {
      setLoading(false);
    }
  };

  // Debug logging pour les changements de rôle
  useEffect(() => {
    if (profile) {
      console.log('🔄 useUserRole: Role state updated');
      console.log('👤 Profile:', profile.email);
      console.log('👑 Role:', profile.role);
      console.log('🚨 Is Super Admin:', isSuperAdmin);
    }
  }, [profile, isSuperAdmin]);

  return {
    profile,
    merchantAccount,
    loading,
    error,
    isSuperAdmin,
    isAdmin,
    isMerchant,
    isVerified,
    refreshUserData
  };
};
