
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAnalyticsData } from "@/hooks/useAnalyticsData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  RefreshCw,
  Download,
  TrendingUp,
  Eye,
  Settings
} from "lucide-react";
import Header from "@/components/Header";
import RevenueChart from "@/components/analytics/RevenueChart";
import PaymentMethodsChart from "@/components/analytics/PaymentMethodsChart";
import TransactionVolumeChart from "@/components/analytics/TransactionVolumeChart";
import SuccessRateChart from "@/components/analytics/SuccessRateChart";
import BusinessMetrics from "@/components/analytics/BusinessMetrics";
import AIPredictions from "@/components/analytics/AIPredictions";

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [merchantId] = useState("mock-merchant-id"); // Mock pour démo
  const [revenuePeriod, setRevenuePeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [volumePeriod, setVolumePeriod] = useState<'today' | 'week' | 'month'>('today');
  
  const { data: analytics, loading, refetch } = useAnalyticsData(merchantId);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-senepay-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des analytics avancés...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center">
          <p className="text-gray-600">Erreur de chargement des données</p>
        </div>
      </div>
    );
  }

  const totalRevenue = analytics.revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const revenueGrowth = 15.3; // Mock calculation

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 container mx-auto px-4 py-8">
        {/* Header avec actions */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-senepay-orange" />
              Analytics & Business Intelligence
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              Dashboard révolutionnaire pour optimiser vos performances
              <Badge variant="outline" className="bg-gradient-to-r from-senepay-orange to-senepay-gold text-white border-none">
                <Eye className="h-3 w-3 mr-1" />
                Niveau Bloomberg
              </Badge>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={refetch} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-senepay-orange to-senepay-gold">
              <Settings className="h-4 w-4" />
              Configuration
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="revenue">Revenus & Performance</TabsTrigger>
            <TabsTrigger value="intelligence">Business Intelligence</TabsTrigger>
            <TabsTrigger value="predictions">Prédictions IA</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Business Metrics */}
            <BusinessMetrics metrics={analytics.businessMetrics} />

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Évolution des revenus</h3>
                  <Select value={revenuePeriod} onValueChange={(value: any) => setRevenuePeriod(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 jours</SelectItem>
                      <SelectItem value="30d">30 jours</SelectItem>
                      <SelectItem value="90d">90 jours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <RevenueChart 
                  data={analytics.revenueData}
                  period={revenuePeriod}
                  totalRevenue={totalRevenue}
                  growth={revenueGrowth}
                />
              </div>
              
              <PaymentMethodsChart data={analytics.paymentMethodsData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Volume des transactions</h3>
                  <Select value={volumePeriod} onValueChange={(value: any) => setVolumePeriod(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <TransactionVolumeChart 
                  data={analytics.volumeData}
                  period={volumePeriod}
                />
              </div>
              
              <SuccessRateChart data={analytics.successRateData} />
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            {/* Métriques revenus détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">Revenus Aujourd'hui</p>
                      <p className="text-2xl font-bold text-green-900">
                        {analytics.revenueData[analytics.revenueData.length - 1]?.revenue.toLocaleString()} FCFA
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Revenus Cette Semaine</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {totalRevenue.toLocaleString()} FCFA
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700">Projection Mensuelle</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {(totalRevenue * 4.3).toLocaleString()} FCFA
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">Croissance MoM</p>
                      <p className="text-2xl font-bold text-orange-900">
                        +{revenueGrowth.toFixed(1)}%
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts revenus détaillés */}
            <RevenueChart 
              data={analytics.revenueData}
              period={revenuePeriod}
              totalRevenue={totalRevenue}
              growth={revenueGrowth}
            />
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <BusinessMetrics metrics={analytics.businessMetrics} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PaymentMethodsChart data={analytics.paymentMethodsData} />
              <SuccessRateChart data={analytics.successRateData} />
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <AIPredictions predictions={analytics.predictions} />
            
            {/* Métriques prédictives */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
                <CardHeader>
                  <CardTitle className="text-indigo-900">Forecast 30j</CardTitle>
                  <CardDescription className="text-indigo-700">
                    Prévision revenus basée IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-900 mb-2">
                    {(analytics.businessMetrics.mrr * 1.15).toLocaleString()} FCFA
                  </div>
                  <div className="flex items-center text-sm text-indigo-700">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +15% vs mois dernier
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Score Santé</CardTitle>
                  <CardDescription className="text-emerald-700">
                    Évaluation globale business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-900 mb-2">
                    87/100
                  </div>
                  <Badge variant="default" className="bg-emerald-600">
                    Excellente santé
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-900">Opportunités</CardTitle>
                  <CardDescription className="text-yellow-700">
                    Potentiel d'optimisation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-900 mb-2">
                    +23%
                  </div>
                  <div className="text-sm text-yellow-700">
                    Revenus supplémentaires possibles
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
