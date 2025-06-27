
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
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
  Shield,
  User
} from "lucide-react";
import Header from "@/components/Header";
import TransactionsList from "@/components/TransactionsList";
import SecurityAlert from '@/components/SecurityAlert';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import DataExport from '@/components/dashboard/DataExport';
import QuickFilters from '@/components/dashboard/QuickFilters';
import EnhancedStats from '@/components/dashboard/EnhancedStats';
import ProfileSettings from '@/components/ProfileSettings';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Import des composants analytics
import RevenueChart from '@/components/analytics/RevenueChart';
import PaymentMethodsChart from '@/components/analytics/PaymentMethodsChart';
import TransactionVolumeChart from '@/components/analytics/TransactionVolumeChart';
import SuccessRateChart from '@/components/analytics/SuccessRateChart';
import BusinessMetrics from '@/components/analytics/BusinessMetrics';
import AIPredictions from '@/components/analytics/AIPredictions';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  phone: string;
  role: string;
  is_verified: boolean;
  avatar_url: string;
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
  const [filters, setFilters] = useState<any>({});

  // Chargement immédiat des données analytics
  const { data: analyticsData, loading: analyticsLoading } = useAnalyticsData(merchantAccount?.id);

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
      window.location.href = '/super-admin';
      return;
    }
  }, [profile, roleLoading]);

  // Chargement optimisé des stats en parallèle
  useEffect(() => {
    if (user && merchantAccount && !isSuperAdmin) {
      loadDashboardData();
    }
  }, [user, merchantAccount, isSuperAdmin]);

  const loadDashboardData = async () => {
    if (!merchantAccount) return;

    try {
      // Requête optimisée pour récupérer toutes les données nécessaires en une fois
      const { data: transactions, error } = await supabase
        .from('transactions')
        .select('amount, status, created_at, payment_method, customer_email')
        .eq('merchant_id', merchantAccount.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      if (transactions) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        // Calculs optimisés en une seule passe
        const statsData = transactions.reduce(
          (acc, t) => {
            const amount = Number(t.amount);
            acc.total_transactions++;
            acc.total_amount += amount;

            if (t.status === 'completed') {
              acc.completed_count++;
              acc.completed_amount += amount;
            } else if (t.status === 'pending') {
              acc.pending_count++;
            } else if (t.status === 'failed') {
              acc.failed_count++;
            }

            // Transactions du jour
            if (new Date(t.created_at) >= today) {
              acc.today_transactions++;
              acc.today_amount += amount;
            }

            return acc;
          },
          {
            total_transactions: 0,
            total_amount: 0,
            completed_amount: 0,
            pending_count: 0,
            completed_count: 0,
            failed_count: 0,
            today_transactions: 0,
            today_amount: 0,
            success_rate: 0
          }
        );

        // Calcul du taux de succès
        statsData.success_rate = statsData.total_transactions > 0 
          ? (statsData.completed_count / statsData.total_transactions) * 100 
          : 0;

        setStats(statsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  // Si c'est un super admin et qu'on est encore ici, forcer la redirection
  if (profile?.role === 'super_admin') {
    console.log('🚨 Super Admin still on dashboard - forcing redirect');
    window.location.href = '/super-admin';
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Affichage immédiat avec données disponibles
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        <SecurityAlert />
        
        {/* Welcome Section avec Notifications et Photo de profil */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-lg font-medium bg-gradient-to-br from-senepay-orange to-senepay-gold text-white">
                  {profile?.full_name ? getInitials(profile.full_name) : <User className="h-8 w-8" />}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Bienvenue, {profile?.full_name || 'Utilisateur'} 👋
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Gérez vos paiements et développez votre business avec SenePay
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <NotificationCenter merchantId={merchantAccount?.id} />
              
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
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tabs optimisés mobile */}
          <div className="w-full overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-5 lg:grid-cols-5 w-full min-w-max lg:min-w-0 gap-1 p-1 bg-muted rounded-lg">
              <TabsTrigger 
                value="overview" 
                className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Vue d'ensemble</span>
                <span className="xs:hidden">Vue</span>
              </TabsTrigger>
              <TabsTrigger 
                value="transactions"
                className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200"
              >
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Transactions</span>
                <span className="xs:hidden">Trans</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics"
                className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Analytics Pro</span>
                <span className="xs:hidden">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="api"
                className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Key className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">API & Dev</span>
                <span className="xs:hidden">API</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Paramètres</span>
                <span className="xs:hidden">Config</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistiques Améliorées - Affichage immédiat */}
            <EnhancedStats stats={stats ? {
              totalRevenue: stats.completed_amount,
              totalTransactions: stats.total_transactions,
              successRate: stats.success_rate,
              averageOrderValue: stats.completed_amount / Math.max(1, stats.completed_count),
              todayRevenue: stats.today_amount,
              todayTransactions: stats.today_transactions,
              activeCustomers: Math.floor(stats.total_transactions * 0.7),
              responseTime: 145
            } : undefined} />

            {/* Filtres rapides */}
            <QuickFilters onFiltersChange={handleFiltersChange} />

            {/* Statuts des transactions - Affichage immédiat */}
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

            <DataExport merchantId={merchantAccount?.id} />

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

          <TabsContent value="analytics" className="space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-senepay-orange" />
                    Analytics Premium
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Pro
                    </Badge>
                  </h2>
                  <p className="text-gray-600">
                    Dashboard avancé avec intelligence artificielle et prédictions business
                  </p>
                </div>
                
                <Button 
                  className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Version Complète
                </Button>
              </div>
            </div>

            {/* Analytics Content - Affichage immédiat */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart 
                  data={analyticsData?.revenueData || []}
                  period="7d"
                  totalRevenue={analyticsData?.revenueData?.reduce((sum, item) => sum + item.revenue, 0) || 0}
                  growth={15.2}
                />
                <PaymentMethodsChart data={analyticsData?.paymentMethodsData || []} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionVolumeChart 
                  data={analyticsData?.volumeData || []} 
                  period="today"
                />
                <SuccessRateChart data={analyticsData?.successRateData || []} />
              </div>

              <BusinessMetrics metrics={analyticsData?.businessMetrics} />
              <AIPredictions predictions={analyticsData?.predictions?.slice(0, 2) || []} />

              {/* Message informatif si pas de données */}
              {!analyticsData?.revenueData?.length && (
                <Card className="border-senepay-orange/20 bg-gradient-to-r from-orange-50 to-yellow-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Crown className="h-8 w-8 text-senepay-orange mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Aucune donnée disponible
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Commencez à traiter des paiements pour voir vos analytics personnalisées.
                      </p>
                      <Button 
                        className="bg-gradient-to-r from-senepay-orange to-senepay-gold"
                        onClick={() => navigate('/analytics')}
                      >
                        <BarChart3 className="h-5 w-5 mr-2" />
                        En savoir plus
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
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

          <TabsContent value="settings" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Settings className="h-6 w-6 text-senepay-orange" />
                Paramètres du compte
              </h2>
              <p className="text-gray-600">
                Gérez votre profil, vos préférences et la configuration de votre compte
              </p>
            </div>

            <ProfileSettings />

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Actions rapides
                </CardTitle>
                <CardDescription>
                  Accès rapide aux fonctionnalités principales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-auto p-6 flex flex-col items-center gap-2" 
                    variant="outline"
                    onClick={() => navigate('/analytics')}
                  >
                    <BarChart3 className="h-8 w-8 text-senepay-orange" />
                    <span className="font-medium">Analytics</span>
                    <span className="text-sm text-gray-500 text-center">
                      Analysez vos performances
                    </span>
                  </Button>
                  
                  <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline">
                    <Key className="h-8 w-8 text-senepay-gold" />
                    <span className="font-medium">API Documentation</span>
                    <span className="text-sm text-gray-500 text-center">
                      Intégrez SenePay facilement
                    </span>
                  </Button>
                  
                  <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline">
                    <Settings className="h-8 w-8 text-gray-600" />
                    <span className="font-medium">Support</span>
                    <span className="text-sm text-gray-500 text-center">
                      Contactez notre équipe
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
