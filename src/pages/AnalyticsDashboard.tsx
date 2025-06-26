
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
                Aucune donnée disponible
              </CardTitle>
              <CardDescription>
                Commencez à recevoir des paiements pour voir vos analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Une fois que vous aurez des transactions, cette page affichera des analytics 
                détaillées avec des graphiques interactifs et des prédictions IA.
              </p>
              <Button className="bg-gradient-to-r from-senepay-orange to-senepay-gold">
                Voir la documentation API
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
