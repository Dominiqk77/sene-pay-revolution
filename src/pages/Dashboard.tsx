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
import { CreditCard, DollarSign, TrendingUp, Users, Settings, Key, BarChart3, Activity, Clock, CheckCircle, XCircle, Crown, Shield, User } from "lucide-react";
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

// Données par défaut pour affichage immédiat
const defaultStats: DashboardStats = {
  total_transactions: 0,
  total_amount: 0,
  completed_amount: 0,
  success_rate: 0,
  pending_count: 0,
  completed_count: 0,
  failed_count: 0,
  today_transactions: 0,
  today_amount: 0
};
const Dashboard = () => {
  const {
    user
  } = useAuth();
  const {
    profile,
    merchantAccount,
    loading: roleLoading,
    isSuperAdmin
  } = useUserRole();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [filters, setFilters] = useState<any>({});

  // Ajouter les données analytics
  const {
    data: analyticsData,
    loading: analyticsLoading
  } = useAnalyticsData(merchantAccount?.id);

  // Données mockées pour la démonstration analytics
  const mockAnalyticsData = {
    revenueData: [{
      date: '20 Déc',
      revenue: 125000,
      transactions: 12
    }, {
      date: '21 Déc',
      revenue: 89000,
      transactions: 8
    }, {
      date: '22 Déc',
      revenue: 156000,
      transactions: 15
    }, {
      date: '23 Déc',
      revenue: 203000,
      transactions: 18
    }, {
      date: '24 Déc',
      revenue: 187000,
      transactions: 14
    }, {
      date: '25 Déc',
      revenue: 234000,
      transactions: 22
    }, {
      date: '26 Déc',
      revenue: 198000,
      transactions: 16
    }],
    paymentMethodsData: [{
      name: 'Orange Money',
      value: 450000,
      count: 45,
      color: '#ff6b35'
    }, {
      name: 'Wave',
      value: 320000,
      count: 32,
      color: '#00d4ff'
    }, {
      name: 'Free Money',
      value: 280000,
      count: 28,
      color: '#8b5cf6'
    }, {
      name: 'Wizall',
      value: 180000,
      count: 18,
      color: '#10b981'
    }, {
      name: 'Visa Card',
      value: 142000,
      count: 14,
      color: '#1d4ed8'
    }],
    volumeData: [{
      time: '0h-3h',
      volume: 12000,
      count: 2
    }, {
      time: '3h-6h',
      volume: 8000,
      count: 1
    }, {
      time: '6h-9h',
      volume: 45000,
      count: 5
    }, {
      time: '9h-12h',
      volume: 89000,
      count: 12
    }, {
      time: '12h-15h',
      volume: 156000,
      count: 18
    }, {
      time: '15h-18h',
      volume: 134000,
      count: 16
    }, {
      time: '18h-21h',
      volume: 98000,
      count: 11
    }, {
      time: '21h-24h',
      volume: 67000,
      count: 8
    }],
    successRateData: [{
      method: 'Orange Money',
      successRate: 98.5,
      totalTransactions: 200,
      successfulTransactions: 197,
      color: '#10b981'
    }, {
      method: 'Wave',
      successRate: 96.2,
      totalTransactions: 130,
      successfulTransactions: 125,
      color: '#10b981'
    }, {
      method: 'Free Money',
      successRate: 94.8,
      totalTransactions: 115,
      successfulTransactions: 109,
      color: '#10b981'
    }, {
      method: 'Wizall',
      successRate: 92.1,
      totalTransactions: 95,
      successfulTransactions: 87,
      color: '#10b981'
    }, {
      method: 'Visa Card',
      successRate: 89.3,
      totalTransactions: 75,
      successfulTransactions: 67,
      color: '#f59e0b'
    }],
    businessMetrics: {
      mrr: 2850000,
      arr: 34200000,
      churnRate: 3.2,
      customerLtv: 1250000,
      averageOrderValue: 87500,
      conversionRate: 94.8,
      responseTime: 145,
      uptime: 99.94,
      mrrGrowth: 18.5,
      customerGrowth: 12.3
    },
    predictions: [{
      type: 'revenue' as const,
      title: 'Revenus Projetés (30j)',
      value: '3.2M FCFA',
      confidence: 87,
      trend: 'up' as const,
      description: 'Basé sur la croissance actuelle et les tendances saisonnières',
      recommendation: 'Optimisez vos campagnes marketing en fin de mois pour maximiser la croissance'
    }, {
      type: 'opportunity' as const,
      title: 'Opportunité Orange Money',
      value: '+23% revenus potentiels',
      confidence: 92,
      trend: 'up' as const,
      description: 'Orange Money montre le meilleur taux de conversion mais représente seulement 35% du volume',
      recommendation: 'Augmentez la visibilité d\'Orange Money sur votre checkout pour optimiser les conversions'
    }]
  };

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

  // Chargement des stats en arrière-plan sans bloquer l'affichage
  useEffect(() => {
    if (user && merchantAccount && !isSuperAdmin) {
      fetchDashboardStats();
    }
  }, [user, merchantAccount, isSuperAdmin]);
  const fetchDashboardStats = async () => {
    if (!merchantAccount) {
      return;
    }
    setIsLoadingStats(true);
    try {
      // Récupérer toutes les transactions
      const {
        data: transactions,
        error
      } = await supabase.from('transactions').select('amount, status, created_at').eq('merchant_id', merchantAccount.id);
      if (error) throw error;
      if (transactions) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const total_transactions = transactions.length;
        const total_amount = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        const completed_transactions = transactions.filter(t => t.status === 'completed');
        const completed_amount = completed_transactions.reduce((sum, t) => sum + Number(t.amount), 0);
        const success_rate = total_transactions > 0 ? completed_transactions.length / total_transactions * 100 : 0;
        const pending_count = transactions.filter(t => t.status === 'pending').length;
        const completed_count = completed_transactions.length;
        const failed_count = transactions.filter(t => t.status === 'failed').length;
        const today_transactions_data = transactions.filter(t => new Date(t.created_at) >= today);
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
      setIsLoadingStats(false);
    }
  };
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Ici on pourrait appliquer les filtres aux données
    console.log('Filters applied:', newFilters);
  };

  // Si c'est un super admin et qu'on est encore ici, forcer la redirection
  if (profile?.role === 'super_admin') {
    console.log('🚨 Super Admin still on dashboard - forcing redirect');
    window.location.href = '/super-admin';
    return null;
  }
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
  };

  // Affichage immédiat du dashboard
  return <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {/* Security Alert */}
        <SecurityAlert />
        
        {/* Welcome Section avec Notifications et Photo de profil */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Photo de profil */}
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="text-lg font-medium bg-gradient-to-br from-senepay-orange to-senepay-gold text-white">
                  {profile?.full_name ? getInitials(profile.full_name) : <User className="h-8 w-8" />}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="md:text-3xl font-bold text-gray-900 mb-2 text-base">
                  Bienvenue 👋
                </h1>
                <h2 className="md:text-2xl font-semibold text-senepay-orange mb-2 text-base">
                  {profile?.full_name || 'Utilisateur'}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Gérez vos paiements et développez votre business avec SenePay
                  {isLoadingStats && <span className="ml-2 text-xs text-senepay-orange">
                      • Mise à jour en cours...
                    </span>}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <NotificationCenter merchantId={merchantAccount?.id} />
              
              {/* Debug info pour Super Admin (à supprimer plus tard) */}
              {profile?.role === 'super_admin' && <div className="text-right">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white mb-2">
                    <Crown className="h-3 w-3 mr-1" />
                    Super Admin Détecté
                  </Badge>
                  <Button onClick={() => navigate('/super-admin')} size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600">
                    <Crown className="h-4 w-4 mr-2" />
                    Accéder Super Admin
                  </Button>
                </div>}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          {/* Tabs optimisés mobile */}
          <div className="w-full overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-5 lg:grid-cols-5 w-full min-w-max lg:min-w-0 gap-1 p-1 bg-muted rounded-lg">
              <TabsTrigger value="overview" className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Vue d'ensemble</span>
                <span className="xs:hidden">Vue</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200">
                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Transactions</span>
                <span className="xs:hidden">Trans</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200">
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Analytics Pro</span>
                <span className="xs:hidden">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200">
                <Key className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">API & Dev</span>
                <span className="xs:hidden">API</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-shrink-0 px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap data-[state=active]:bg-white data-[state=active]:text-senepay-orange data-[state=active]:shadow-sm transition-all duration-200">
                <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Paramètres</span>
                <span className="xs:hidden">Config</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistiques Améliorées */}
            <EnhancedStats stats={{
            totalRevenue: stats.completed_amount,
            totalTransactions: stats.total_transactions,
            successRate: stats.success_rate,
            averageOrderValue: stats.completed_amount / Math.max(1, stats.completed_count),
            todayRevenue: stats.today_amount,
            todayTransactions: stats.today_transactions,
            activeCustomers: Math.floor(stats.total_transactions * 0.7),
            // Mock
            responseTime: 145 // Mock
          }} />

            {/* Filtres rapides */}
            <QuickFilters onFiltersChange={handleFiltersChange} />

            {/* Statuts des transactions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">En attente</p>
                      <p className="text-3xl font-bold">{stats.pending_count}</p>
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
                      <p className="text-3xl font-bold">{stats.completed_count}</p>
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
                      <p className="text-3xl font-bold">{stats.failed_count}</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Export de données */}
            <DataExport merchantId={merchantAccount?.id} />

            {/* Account Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Statut du compte
                      {profile?.role === 'super_admin' && <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white ml-2">
                          <Crown className="h-3 w-3 mr-1" />
                          Super Admin
                        </Badge>}
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
                      {profile?.role === 'super_admin' ? <span className="flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          Super Administrateur
                        </span> : profile?.role}
                    </Badge>
                  </div>
                  {profile?.company_name && <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Entreprise</p>
                      <p className="font-medium">{profile.company_name}</p>
                    </div>}
                  {profile?.phone && <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Téléphone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>}
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
                
                <Button className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white" onClick={() => navigate('/analytics')}>
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Version Complète
                </Button>
              </div>
            </div>

            {/* Analytics Content - Toujours affiché */}
            <div className="space-y-6">
              {/* Graphiques principaux */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart data={analyticsData?.revenueData || mockAnalyticsData.revenueData} period="7d" totalRevenue={(analyticsData?.revenueData || mockAnalyticsData.revenueData).reduce((sum, item) => sum + item.revenue, 0)} growth={15.2} />
                <PaymentMethodsChart data={analyticsData?.paymentMethodsData || mockAnalyticsData.paymentMethodsData} />
              </div>

              {/* Volume et taux de succès */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionVolumeChart data={analyticsData?.volumeData || mockAnalyticsData.volumeData} period="today" />
                <SuccessRateChart data={analyticsData?.successRateData || mockAnalyticsData.successRateData} />
              </div>

              {/* Business Metrics */}
              <BusinessMetrics metrics={analyticsData?.businessMetrics || mockAnalyticsData.businessMetrics} />

              {/* Prédictions IA */}
              <AIPredictions predictions={analyticsData?.predictions?.slice(0, 2) || mockAnalyticsData.predictions} />

              {/* Message pour les données de démonstration */}
              {!analyticsData && <Card className="border-senepay-orange/20 bg-gradient-to-r from-orange-50 to-yellow-50">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <Crown className="h-8 w-8 text-senepay-orange mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Données de démonstration
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Ces graphiques montrent des données d'exemple. Connectez vos vraies transactions pour voir vos analytics personnalisées.
                      </p>
                      <Button className="bg-gradient-to-r from-senepay-orange to-senepay-gold" onClick={() => navigate('/analytics')}>
                        <BarChart3 className="h-5 w-5 mr-2" />
                        Voir la version complète
                      </Button>
                    </div>
                  </CardContent>
                </Card>}
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            {/* API Credentials */}
            {merchantAccount && <Card>
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
              </Card>}

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

            {/* Composant ProfileSettings */}
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
                  <Button className="h-auto p-6 flex flex-col items-center gap-2" variant="outline" onClick={() => navigate('/analytics')}>
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
    </div>;
};
export default Dashboard;