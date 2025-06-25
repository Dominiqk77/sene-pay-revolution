
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings,
  Key,
  BarChart3,
  Smartphone
} from "lucide-react";
import Header from "@/components/Header";

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  phone: string;
  role: string;
  is_verified: boolean;
}

interface MerchantAccount {
  id: string;
  business_name: string;
  business_type: string;
  api_key: string;
  is_active: boolean;
  monthly_volume: number;
  total_transactions: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [merchantAccount, setMerchantAccount] = useState<MerchantAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (!profileError && profileData) {
        setProfile(profileData);
      }

      // Fetch merchant account
      const { data: merchantData, error: merchantError } = await supabase
        .from('merchant_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!merchantError && merchantData) {
        setMerchantAccount(merchantData);
      }

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senepay-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de votre tableau de bord...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {profile?.full_name || user?.email} 👋
          </h1>
          <p className="text-gray-600">
            Gérez vos paiements et développez votre business avec SenePay
          </p>
        </div>

        {/* Account Status */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Statut du compte
                </CardTitle>
                <CardDescription>
                  Informations sur votre compte marchand
                </CardDescription>
              </div>
              <Badge variant={profile?.is_verified ? "default" : "secondary"}>
                {profile?.is_verified ? "Vérifié" : "En attente"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="font-medium">{profile?.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Rôle</p>
                <Badge variant="outline" className="capitalize">
                  {profile?.role}
                </Badge>
              </div>
              {profile?.company_name && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Entreprise</p>
                  <p className="font-medium">{profile.company_name}</p>
                </div>
              )}
              {profile?.phone && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Téléphone</p>
                  <p className="font-medium">{profile.phone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* API Credentials */}
        {merchantAccount && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Clés API
              </CardTitle>
              <CardDescription>
                Utilisez ces clés pour intégrer SenePay à votre application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 mb-2">Clé API</p>
                  <code className="text-sm bg-white px-3 py-2 rounded border break-all">
                    {merchantAccount.api_key}
                  </code>
                </div>
                <p className="text-sm text-gray-600">
                  ⚠️ Gardez vos clés secrètes ! Ne les partagez jamais publiquement.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-senepay-orange/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-senepay-orange" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Volume mensuel</p>
                  <p className="text-2xl font-bold">
                    {merchantAccount?.monthly_volume?.toLocaleString('fr-FR')} FCFA
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-senepay-gold/10 rounded-lg">
                  <CreditCard className="h-6 w-6 text-senepay-gold" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-2xl font-bold">
                    {merchantAccount?.total_transactions || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taux de succès</p>
                  <p className="text-2xl font-bold">98.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Smartphone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Mobile Money</p>
                  <p className="text-2xl font-bold">75%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Actions rapides
            </CardTitle>
            <CardDescription>
              Commencez à utiliser SenePay dès maintenant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline">
                <BarChart3 className="h-8 w-8 text-senepay-orange" />
                <span className="font-medium">Voir les Analytics</span>
                <span className="text-sm text-gray-500 text-center">
                  Analysez vos performances
                </span>
              </Button>
              
              <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline">
                <Key className="h-8 w-8 text-senepay-gold" />
                <span className="font-medium">Documentation API</span>
                <span className="text-sm text-gray-500 text-center">
                  Intégrez SenePay facilement
                </span>
              </Button>
              
              <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline">
                <Settings className="h-8 w-8 text-gray-600" />
                <span className="font-medium">Paramètres</span>
                <span className="text-sm text-gray-500 text-center">
                  Configurez votre compte
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
