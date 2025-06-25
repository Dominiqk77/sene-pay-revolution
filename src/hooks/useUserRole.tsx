
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
        setProfile(null);
        setMerchantAccount(null);
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching user data for:', user.email);
        
        // Récupérer le profil utilisateur
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          setError('Erreur lors du chargement du profil utilisateur');
          return;
        }

        console.log('Profile data:', profileData);
        setProfile(profileData);

        // Récupérer le compte marchand si l'utilisateur en a un
        const { data: merchantData, error: merchantError } = await supabase
          .from('merchant_accounts')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (merchantError) {
          console.error('Error fetching merchant account:', merchantError);
          // Ne pas considérer comme une erreur critique si pas de merchant account
        } else if (merchantData) {
          console.log('Merchant account data:', merchantData);
          setMerchantAccount(merchantData);
        }

      } catch (err) {
        console.error('Unexpected error fetching user data:', err);
        setError('Erreur inattendue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const refreshUserData = async () => {
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
        console.error('Error refreshing profile:', profileError);
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

    } catch (err) {
      console.error('Error refreshing user data:', err);
      setError('Erreur lors du rechargement des données');
    } finally {
      setLoading(false);
    }
  };

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
