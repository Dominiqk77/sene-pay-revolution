
import { useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Calendar,
  Crown,
  Zap
} from 'lucide-react';

// Import des composants analytics
import RevenueChart from '@/components/analytics/RevenueChart';
import PaymentMethodsChart from '@/components/analytics/PaymentMethodsChart';
import TransactionVolumeChart from '@/components/analytics/TransactionVolumeChart';
import SuccessRateChart from '@/components/analytics/SuccessRateChart';
import BusinessMetrics from '@/components/analytics/BusinessMetrics';
import AIPredictions from '@/components/analytics/AIPredictions';

const AnalyticsDashboard = () => {
  const { merchantAccount, loading: userLoading } = useUserRole();
  const { data: analyticsData, loading: analyticsLoading, refetch } = useAnalyticsData(merchantAccount?.id);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [volumePeriod, setVolumePeriod] = useState<'today' | 'week' | 'month'>('today');

  const handleRefresh = () => {
    refetch();
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting analytics data...');
  };

  // Debug logging
  console.log('🔍 Analytics Dashboard Debug:', {
    userLoading,
    analyticsLoading,
    merchantAccount: merchantAccount?.id,
    analyticsData: !!analyticsData
  });

  if (userLoading || analyticsLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senepay-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des analytics avancées...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-senepay-orange" />
                Analytics Premium
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Pro
                </Badge>
              </h1>
              <p className="text-gray-600">
                Dashboard avancé avec intelligence artificielle et prédictions business
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
                <SelectTrigger className="w-40">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 derniers jours</SelectItem>
                  <SelectItem value="30d">30 derniers jours</SelectItem>
                  <SelectItem value="90d">90 derniers jours</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
              
              <Button onClick={handleExport} className="bg-gradient-to-r from-senepay-orange to-senepay-gold">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {analyticsData ? (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="revenue">Revenus</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="business">Business Metrics</TabsTrigger>
              <TabsTrigger value="ai">IA & Prédictions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Graphique des revenus principal */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RevenueChart 
                  data={analyticsData.revenueData}
                  period={period}
                  totalRevenue={analyticsData.revenueData.reduce((sum, item) => sum + item.revenue, 0)}
                  growth={15.2}
                />
                <PaymentMethodsChart data={analyticsData.paymentMethodsData} />
              </div>

              {/* Volume et taux de succès */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionVolumeChart 
                  data={analyticsData.volumeData} 
                  period={volumePeriod}
                />
                <SuccessRateChart data={analyticsData.successRateData} />
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <RevenueChart 
                data={analyticsData.revenueData}
                period={period}
                totalRevenue={analyticsData.revenueData.reduce((sum, item) => sum + item.revenue, 0)}
                growth={15.2}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PaymentMethodsChart data={analyticsData.paymentMethodsData} />
                <TransactionVolumeChart 
                  data={analyticsData.volumeData} 
                  period={volumePeriod}
                />
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SuccessRateChart data={analyticsData.successRateData} />
                <TransactionVolumeChart 
                  data={analyticsData.volumeData} 
                  period={volumePeriod}
                />
              </div>
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <BusinessMetrics metrics={analyticsData.businessMetrics} />
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <AIPredictions predictions={analyticsData.predictions} />
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-senepay-orange" />
                Génération des données d'exemple
              </CardTitle>
              <CardDescription>
                Données mockées pour démonstration - Connectez vos vraies transactions pour voir vos analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Données mockées pour la démonstration */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <RevenueChart 
                    data={[
                      { date: '20 Déc', revenue: 125000, transactions: 12 },
                      { date: '21 Déc', revenue: 89000, transactions: 8 },
                      { date: '22 Déc', revenue: 156000, transactions: 15 },
                      { date: '23 Déc', revenue: 203000, transactions: 18 },
                      { date: '24 Déc', revenue: 187000, transactions: 14 },
                      { date: '25 Déc', revenue: 234000, transactions: 22 },
                      { date: '26 Déc', revenue: 198000, transactions: 16 }
                    ]}
                    period="7d"
                    totalRevenue={1192000}
                    growth={15.2}
                  />
                  <PaymentMethodsChart data={[
                    { name: 'Orange Money', value: 450000, count: 45, color: '#ff6b35' },
                    { name: 'Wave', value: 320000, count: 32, color: '#00d4ff' },
                    { name: 'Free Money', value: 280000, count: 28, color: '#8b5cf6' },
                    { name: 'Visa Card', value: 142000, count: 14, color: '#1d4ed8' }
                  ]} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <TransactionVolumeChart 
                    data={[
                      { time: '0h-3h', volume: 12000, count: 2 },
                      { time: '3h-6h', volume: 8000, count: 1 },
                      { time: '6h-9h', volume: 45000, count: 5 },
                      { time: '9h-12h', volume: 89000, count: 12 },
                      { time: '12h-15h', volume: 156000, count: 18 },
                      { time: '15h-18h', volume: 134000, count: 16 },
                      { time: '18h-21h', volume: 98000, count: 11 },
                      { time: '21h-24h', volume: 67000, count: 8 }
                    ]}
                    period="today"
                  />
                  <SuccessRateChart data={[
                    { method: 'Orange Money', successRate: 98.5, totalTransactions: 200, successfulTransactions: 197, color: '#10b981' },
                    { method: 'Wave', successRate: 96.2, totalTransactions: 130, successfulTransactions: 125, color: '#10b981' },
                    { method: 'Free Money', successRate: 94.8, totalTransactions: 115, successfulTransactions: 109, color: '#10b981' },
                    { method: 'Visa Card', successRate: 89.3, totalTransactions: 75, successfulTransactions: 67, color: '#f59e0b' }
                  ]} />
                </div>

                <BusinessMetrics metrics={{
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
                }} />

                <AIPredictions predictions={[
                  {
                    type: 'revenue',
                    title: 'Revenus Projetés (30j)',
                    value: '3.2M FCFA',
                    confidence: 87,
                    trend: 'up',
                    description: 'Basé sur la croissance actuelle et les tendances saisonnières',
                    recommendation: 'Optimisez vos campagnes marketing en fin de mois pour maximiser la croissance'
                  },
                  {
                    type: 'opportunity',
                    title: 'Opportunité Orange Money',
                    value: '+23% revenus potentiels',
                    confidence: 92,
                    trend: 'up',
                    description: 'Orange Money montre le meilleur taux de conversion mais représente seulement 35% du volume',
                    recommendation: 'Augmentez la visibilité d\'Orange Money sur votre checkout pour optimiser les conversions'
                  }
                ]} />
              </div>
              
              <div className="mt-6 text-center">
                <Button className="bg-gradient-to-r from-senepay-orange to-senepay-gold">
                  Voir la documentation API pour connecter vos données
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
