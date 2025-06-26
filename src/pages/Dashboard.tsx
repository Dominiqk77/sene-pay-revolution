import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings,
  Key,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Crown,
  Shield
} from "lucide-react";
import Header from "@/components/Header";
import TransactionsList from "@/components/TransactionsList";
import SecurityAlert from '@/components/SecurityAlert';

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

interface DashboardStats {
  total_transactions: number;
  total_amount: number;
  completed_amount: number;
  success_rate: number;
  pending_count: number;
  completed_count: number;
  failed_count: number;
  today_transactions: number;
  today_amount: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, merchantAccount, loading: roleLoading, isSuperAdmin } = useUserRole();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Debug logging pour identifier le problème
  useEffect(() => {
    console.log('=== DEBUG DASHBOARD ===');
    console.log('User:', user?.email);
    console.log('Profile:', profile);
    console.log('Profile role:', profile?.role);
    console.log('Is Super Admin:', isSuperAdmin);
    console.log('Role loading:', roleLoading);
    console.log('=======================');
  }, [user, profile, isSuperAdmin, roleLoading]);

  // Redirection vers Super Admin Dashboard - immédiate et robuste
  useEffect(() => {
    if (!roleLoading && profile?.role === 'super_admin') {
      console.log('🚨 Super Admin detected - immediate redirect to /super-admin');
      // Redirection immédiate sans délai
      window.location.href = '/super-admin';
      return; // Arrêter l'exécution
    }
  }, [profile, roleLoading]);

  useEffect(() => {
    if (user && !isSuperAdmin && !roleLoading) {
      fetchDashboardStats();
    }
  }, [user, isSuperAdmin, roleLoading]);

  const fetchDashboardStats = async () => {
    if (!merchantAccount) {
      setLoading(false);
      return;
    }

    try {
      // Récupérer toutes les transactions
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, status, created_at')
        .eq('merchant_id', merchantAccount.id);

      if (error) throw error;

      if (transactions) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const total_transactions = transactions.length;
        const total_amount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        const completed_transactions = transactions.filter(t => t.status === 'completed');
        const completed_amount = completed_transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        const success_rate = total_transactions > 0 ? (completed_transactions.length / total_transactions) * 100 : 0;
        
        const pending_count = transactions.filter(t => t.status === 'pending').length;
        const completed_count = completed_transactions.length;
        const failed_count = transactions.filter(t => t.status === 'failed').length;

        const today_transactions_data = transactions.filter(t => 
          new Date(t.created_at) >= today
        );
        const today_transactions = today_transactions_data.length;
        const today_amount = today_transactions_data.reduce((sum, t) => sum + Number(t.amount), 0);

        setStats({
          total_transactions,
          total_amount,
          completed_amount,
          success_rate,
          pending_count,
          completed_count,
          failed_count,
          today_transactions,
          today_amount
        });
      }

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Affichage de chargement amélioré
  if (loading || roleLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senepay-orange mx-auto mb-4"></div>
            <p className="text-gray-600">
              {roleLoading ? 'Vérification de vos permissions...' : 'Chargement de votre tableau de bord...'}
            </p>
            {profile?.role === 'super_admin' && (
              <p className="text-sm text-senepay-orange mt-2">
                Redirection vers le tableau de bord Super Admin...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Si c'est un super admin et qu'on est encore ici, forcer la redirection
  if (profile?.role === 'super_admin') {
    console.log('🚨 Super Admin still on dashboard - forcing redirect');
    window.location.href = '/super-admin';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {/* Security Alert */}
        <SecurityAlert />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bienvenue, {profile?.full_name || user?.email} 👋
              </h1>
              <p className="text-gray-600">
                Gérez vos paiements et développez votre business avec SenePay
              </p>
            </div>
            
            {/* Debug info pour Super Admin (à supprimer plus tard) */}
            {profile?.role === 'super_admin' && (
              <div className="text-right">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-2">
                  <Crown className="h-3 w-3 mr-1" />
                  Super Admin Détecté
                </Badge>
                <Button 
                  onClick={() => navigate('/super-admin')}
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Accéder Super Admin
                </Button>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics Pro</TabsTrigger>
            <TabsTrigger value="api">API & Développement</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-senepay-orange/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-senepay-orange" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Revenus totaux</p>
                      <p className="text-2xl font-bold">
                        {stats?.completed_amount?.toLocaleString('fr-FR') || '0'} FCFA
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
                        {stats?.total_transactions || 0}
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
                      <p className="text-2xl font-bold">
                        {stats?.success_rate?.toFixed(1) || '0'}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Aujourd'hui</p>
                      <p className="text-2xl font-bold">
                        {stats?.today_transactions || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statuts des transactions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-3xl font-bold">{stats?.pending_count || 0}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Confirmées</p>
                      <p className="text-3xl font-bold">{stats?.completed_count || 0}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Échouées</p>
                      <p className="text-3xl font-bold">{stats?.failed_count || 0}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Account Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Statut du compte
                      {profile?.role === 'super_admin' && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-2">
                          <Crown className="h-3 w-3 mr-1" />
                          Super Admin
                        </Badge>
                      )}
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
                      {profile?.role === 'super_admin' ? (
                        <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          Super Administrateur
                        </span>
                      ) : (
                        profile?.role
                      )}
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
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsList merchantId={merchantAccount?.id} />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics Premium - Niveau Bloomberg
                </CardTitle>
                <CardDescription>
                  Dashboard révolutionnaire avec intelligence artificielle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="mb-4">
                    <BarChart3 className="h-16 w-16 text-senepay-orange mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analytics Révolutionnaire</h3>
                    <p className="text-gray-600 mb-6">
                      Découvrez nos analytics premium avec prédictions IA, métriques business avancées,
                      et recommandations intelligentes pour optimiser vos performances.
                    </p>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white px-8 py-3"
                    onClick={() => window.location.href = '/analytics'}
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Ouvrir Analytics Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            {/* API Credentials */}
            {merchantAccount && (
              <Card>
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
                      <p className="text-sm font-medium text-gray-500 mb-2">Clé API Publique</p>
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

            {/* API Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Documentation API
                </CardTitle>
                <CardDescription>
                  Guides et exemples pour intégrer SenePay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Créer un paiement</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      POST /functions/v1/create-payment
                    </p>
                    <Button variant="outline" size="sm">
                      Voir l'exemple
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Vérifier un paiement</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      GET /functions/v1/verify-payment/:id
                    </p>
                    <Button variant="outline" size="sm">
                      Voir l'exemple
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Paramètres du compte
                </CardTitle>
                <CardDescription>
                  Gérez votre compte et vos préférences
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
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
